import { Router } from "express";
// eslint-disable-next-line import/no-unresolved , node/no-missing-import
import is from "@sindresorhus/is";
import { userService } from "../services";
import { userController } from "../controllers";
import { isAdmin, loginRequired } from "../middleware";

const adminRouter = Router();

export default adminRouter;
