// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import is from "@sindresorhus/is";
import { userService } from "../services";
import logger from "../middleware/logger";
// const passport = require("passport"); // 카카오 로그인 도입예정
// import passport from "passport";
// import kakaoPassport from "passport-kakao";
import jwt from "jsonwebtoken";

// const KakaoStrategy = kakaoPassport.Strategy;
// const KakaoStrategy = require("passport-kakao").Strategy;

const appjson = "headers의 Content-Type을 application/json으로 설정해주세요";

class UserController {
  async register(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(appjson);
      }
      const { name, email, password } = req.body;
      const newUser = await userService.addUser({
        name,
        email,
        password,
      });

      logger.info("회원가입 성공", { message: name });

      const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

      const token = jwt.sign(
        { userId: email._id, pe: email.isAdmin },
        secretKey,
        {
          expiresIn: "1h",
        },
      );
      const isAdmin = false;

      res.status(201).json({ token, isAdmin });
      return json(token);
    } catch (error) {
      next(error);
    }
  }

  // async kakao(req, res, next) {
  //   const headers = req.headers["authorization"];
  //   const kakaoToken = headers.split(" ")[1];

  //   const accessToken = await userService.kakao(kakaoToken);

  //   return res.status(200).json({ accessToken: accessToken });
  // }

  async login(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(appjson);
      }
      const { email, password } = req.body;
      const result = await userService.getUserToken({ email, password });
      logger.info("로그인 성공", { message: email });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    logger.info("로그아웃");
    res.clearCookie("user").end();
  }

  async getUser(req, res, next) {
    try {
      // 토큰에 저장된 id
      const id = req.userId;
      const currentUserInfo = await userService.getUserDetail(id);
      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const deleteUser = await userService.deleteUser(userId);
      logger.info("회원 삭제", { message: userId });
      res.status(200).json(deleteUser);
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(appjson);
      }

      const { userId } = req.params;
      const {
        name,
        password,
        currentPassword,
        address1,
        address2,
        zipCode,
        city,
        phoneNumber,
      } = req.body;
      const userInfo = { userId, currentPassword };
      const editUserInfo = await userService.setUser(userInfo, {
        name,
        password,
        address1,
        address2,
        zipCode,
        city,
        phoneNumber,
      });
      logger.info("회원정보 수정", { message: name });
      res.status(200).json(editUserInfo);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export { userController };
