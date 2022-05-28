const express = require("express");
const morgan = require("morgan");
const appRouter = require("./router")
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use('/',appRouter);

// Middleware to handle invalid route
app.use((req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: "Invalid route",
  });
});
// Global Error Handler
app.use((err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.code).json({
      status: "Fail",
      message: err.message,
    });
  }
  console.log(err);
  res.status(500).json({
    status: "Fail",
    message: "Something went wrong",
  });
});
module.exports = app;
