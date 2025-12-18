const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // Default esponse for unexpected errors
  const status = 500;
  const message = "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
