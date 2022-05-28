exports.handleValidationError = (err, res, insertMany = false) => {
  //Validation Error API Response
  console.log(err);
  let message = "";
  // err.mongoose.validationErrors is available when rawResult:true and ordered:false
  const obj = err.errors || err.mongoose.validationErrors[0].errors;
  for (const key in obj) {
    let msg;
    msg = obj[key].message;
    message += msg + ",";
  }
  message = message.split(",");
  message.pop(); //To remove the last comma separator
  if (!insertMany)
    return res.status(400).json({
      status: "Fail",
      message: message,
    });
  return res.status(202).json({
    status: "Ok",
    inserted: err.insertedIds,
    message,
  });
};

exports.handleDuplicates = (err, res) => {
  // Duplicate Key Error API Response
  let x;
  x = Object.keys(err.keyValue).map((val) => {
    return val[0].toUpperCase() + val.slice(1, val.length);
  });
  return res.status(400).json({
    status: "Fail",
    message: `${x.join(", ")} already exists`,
  });
};
