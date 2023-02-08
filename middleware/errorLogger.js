import logger from "./logger";

function errorLogger(err, req, res, next) {
  logger.error("Error 로그", { message: err });
  next(err);
}

export default errorLogger;
