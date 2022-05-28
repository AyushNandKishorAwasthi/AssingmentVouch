const Address = require("./addressBookModel");
const CustomError = require("./customError");
const { handleValidationError, handleDuplicates } = require("./errController");
// ADD NEW CONTACT api
exports.addNewContact = async (req, res, next) => {
  try {
    const address = await Address.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      pincode: req.body.pincode,
    });
    // console.log(address);
    res.status(201).json({
      status: "Ok",
      address,
    });
  } catch (err) {
    if (err.code === 11000) handleDuplicates(err, res);
    if (err.name === "ValidationError") {
      handleValidationError(err, res);
    } else next(err);
  }
};

// ADD BULK ADDRESS
exports.addWholeBulk = async (req, res, next) => {
  try {
    // console.log(req.body);
    const addressBulk = await Address.insertMany(req.body, {
      ordered: false,
      rawResult: true,
    });
    if (addressBulk.mongoose) {
      throw addressBulk;
    }
    res.status(201).json({
      status: "Ok",
      addressBulk,
    });
  } catch (err) {
    console.log(err.name);
    if (err.mongoose) {
      console.log("AddressBulk.Mongoose, Check Some docs are inserted");
      return handleValidationError(err, res, true);
    }
    if (err.name === "MongoBulkWriteError") {
      // Duplicate Key Error API Response
      // console.log(err.insertedDocs)
      let x;
      x = err.writeErrors.map((val) => {
        return val.errmsg.match(/["](.*)["]/)[1];
      });
      return res.status(202).json({
        status: "Ok",
        docs: err.insertedDocs,
        message: `${x.join(", ")} already exists`,
      });
    }
    if (err.name === "ValidationError") handleValidationError(err, res);
    return res.status(400).json({
      status: "Fail",
      name: err.name,
      err,
    });
  }
};

// FETCH DETAILS OF SINGLE CONTACT api
exports.getTargetId = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const address = await Address.findById(req.params.id).select("-__v");
    if (!address)
      return next(
        new CustomError(true, `The _id: ${req.params.id} does not exists`, 400)
      );
    // console.log(address);
    res.status(200).json({
      status: "Ok",
      address,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE THE GIVEN CONTACT api
exports.updateTargetId = async (req, res, next) => {
  try {
    console.log(req.params.id, req.body.updateObj);
    const updateObj = req.body.updateObj;
    // Using document and modifying as per available request body data
    // validators on update are not fully functional for schema validity requirements
    const address = await Address.findById(req.params.id);
    if (!address) return next(new CustomError(true, "Address not found", 400));
    address.name = updateObj.name ?? address.name;
    address.email = updateObj.email ?? address.email;
    address.pincode = updateObj.pincode ?? address.pincode;
    address.address = updateObj.address ?? address.address;
    const updatedAddress = await address.save(); // to check the validity of data for all fields
    updatedAddress.__v = undefined; // to remove the field in response object
    return res.status(200).json({
      status: "Ok",
      updatedAddress,
    });
  } catch (err) {
    if (err.code === 11000) handleDuplicates(err, res);
    if (err.name === "ValidationError") handleValidationError(err, res);
    else next(err);
  }
};

// DELETE THE GIVEN CONTACT api
exports.deleteTargetId = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address)
      return next(
        new CustomError(true, `The _id: ${req.params.id} does not exists`, 400)
      );
    // console.log(address);
    res.status(200).json({
      status: "Ok",
      message: "Address deleted",
    });
  } catch (err) {
    next(err);
  }
};

// PAGINATION api
exports.paginatedResults = async (req, res, next) => {
  try {
    // console.log(req.query);
    const results = await Address.estimatedDocumentCount();
    const page = Number.parseInt(req.query.page) ?? 1;
    const limit = Number.parseInt(req.query.limit) ?? 3;
    const skip = (page - 1) * limit;
    const addressData = await Address.find().skip(skip).limit(limit);
    res.status(200).json({
      status: "Ok",
      results,
      addressData,
    });
  } catch (err) {
    next(err);
  }
};
