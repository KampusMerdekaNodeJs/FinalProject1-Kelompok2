function errMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.message.includes("split")) {
    err.message = "Something went very wrong";
  }
  if (err.message === "jwt malformed") {
    err.message = "Invalid Token";
  }

  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
}

module.exports = errMiddleware;
