import express from "express";
import { orderProductController } from "../controllers";
import { loginRequired } from "../middleware";

const orderProductRouter = express.Router();

orderProductRouter.post(
  "/order/product",
  loginRequired,
  orderProductController.addOrderProduct,
);
orderProductRouter.get(
  "/order/product/:orderId",
  loginRequired,
  orderProductController.getOrderProduct,
);
orderProductRouter.delete(
  "/order/product/:orderId",
  loginRequired,
  orderProductController.deleteOrderProduct,
);

export default orderProductRouter;
