import createError from "http-errors";

function errorHandler404(req, res, next) {
  next(createError(404));
}

export default errorHandler404;
