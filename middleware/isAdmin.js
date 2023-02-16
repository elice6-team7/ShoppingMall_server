import jwt from "jsonwebtoken";
import logger from "./logger";

const isAdmin = (req, res, next) => {
  // authorization 검증
  if (req.headers.authorization === undefined) {
    res.status(403).json({
      error: "로그인이 필요 서비스입니다.",
      data: null,
    });
  }

  // 토큰 검증
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = req.headers.authorization.slice(7);
    if (!token || token === "null") {
      logger.info(
        "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음",
      );
      logger.info("서비스");
      res.status(401).json({
        result: "forbidden-approach",
        reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
      });
      return;
    }
    const userInfo = jwt.verify(token, secretKey);
    const { pe } = userInfo;
    console.log("role", pe);
    if (!pe) {
      logger.info("서비스 사용 요청이 있었지만 관리자가 아닙니다.", {
        message: userInfo,
      });
      res.status(401).json({
        result: "forbidden-approach",
        reason: "정상적인 토큰이 아닙니다.",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
