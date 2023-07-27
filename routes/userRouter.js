import { Router } from "express";
// eslint-disable-next-line import/no-unresolved , node/no-missing-import
import { userController } from "../controllers";
import { loginRequired } from "../middleware";

const userRouter = Router();
// 회원가입
userRouter.post("/users/register", userController.register);

// 로그인
userRouter.post("/users/login", userController.login);

// 로그아웃
userRouter.post("/users/logout/", loginRequired, userController.logout);

// 유저 페이지
userRouter.get("/users/account/", loginRequired, userController.getUser);

// 회원정보수정
userRouter.patch(
  "/users/account/:userId",
  loginRequired,
  userController.editUser,
);

// 회원탈퇴
userRouter.delete(
  "/users/signout/:userId",
  loginRequired,
  userController.deleteUser,
);

export default userRouter;
