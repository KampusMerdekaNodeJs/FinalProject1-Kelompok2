const jwt = require("jsonwebtoken");
const AppError = require("../utils/app.error");

function authentication(req, res, next) {
  try {
    const auth = req.headers["x-access-token"].split(" ");
    if (auth[0] !== "Bearer") throw new Error("Invalid Bearer");
    if (!auth[1]) {
      throw new Error("Invalid JsonWebToken");
    }
    const decoded = jwt.verify(auth[1], process.env.JWT_KEY);

    if (!decoded) {
      throw new Error("Invalid Token");
    }

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (err) {
    next(new AppError(err.message, 403));
  }
}

module.exports = authentication;
