const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.isNotAuth("Is not authenticated"));
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return next(ApiError.forbidden("Access denided"));
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(ApiError.internal(`Oops, something went wrong :( ${error}`));
    }
  };
};
