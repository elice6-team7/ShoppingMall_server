import express from "express";
import { orderController } from "../controllers";
import { loginRequired, isAdmin } from "../middleware";

const orderRouter = express.Router();

orderRouter.post("/order", loginRequired, orderController.addOrder);
orderRouter.get("/order", isAdmin, orderController.getOrderAdmin);
orderRouter.get("/order/:userId", loginRequired, orderController.getOrderUser);
orderRouter.patch("/order/:orderId", loginRequired, orderController.setOrder);
orderRouter.delete(
  "/order/:orderId",
  loginRequired,
  orderController.deleteOrder,
);

export default orderRouter;
