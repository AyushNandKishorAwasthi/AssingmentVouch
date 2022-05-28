const User = require("./userModel");
const CustomError = require("./customError");
const bcryptjs = require("bcryptjs");
const {handleValidationError} = require('./errController')
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (user) => {
  return jwt.sign({ id: user }, "digitalcomputerisanelectronicalmachine", {
    expiresIn: "7d",
  });
};

const sendToken = (user, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "Ok",
    user,
    token,
  });
};

const verifyToken = async (token) => {
  return await promisify(jwt.verify)(
    token,
    "digitalcomputerisanelectronicalmachine"
  );
};

// Middleware for authorized users
exports.checkAdmin = (...roles) => {
  return (req, res, next) => {
    // console.log(roles,req.body);
    if (!roles.includes(req.user.role))
      return next(
        new CustomError(
          true,
          "You do not have permission to perform this action",
          400
        )
      );
    next();
  };
};

exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
      return next(new CustomError(true, "Please login to continue", 401));

    const user = await verifyToken(token);
    // User check
    const userId = await User.findById(user.id);
    if (!userId)
      return next(new CustomError(true, "User does not exists", 401));
    req.user = userId;
    next();
  } catch (err) {
    next(err);
  }
};




// CREATE NEW USER
exports.createUser = async (req, res, next) => {
  try {
    const userDoc = await User.create({
      name: req.body.name,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body?.role,
    });
    userDoc.password = undefined;
    userDoc.__v = undefined;
    sendToken(userDoc, res);
  } catch (err) {
    if (err.name === "ValidationError") {
      handleValidationError(err, res);
    } else return next(err);
  }
};

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return next(new CustomError(true, "Missing name or password", 400));
    }
    const doc = await User.findOne({ name }).select("password");
    if (!doc || !(await bcryptjs.compare(password, doc.password))) {
      return next(new CustomError(true, "Incorrect name or password", 401));
    }
    // console.log(doc);
    doc.password = undefined;
    sendToken(doc, res);
  } catch (err) {
    console.log("inside catch");
    next(err);
  }
};
