import express from "express";
import { orderController } from "../controllers";

const orderRouter = express.Router();

orderRouter.post("/order", orderController.addOrder);
orderRouter.get("/order", orderController.getOrderAdmin);
orderRouter.get("/order/:userId", orderController.getOrderUser);
orderRouter.patch("/order/:orderId", orderController.setOrder);
orderRouter.delete("/order/:orderId", orderController.deleteOrder);

export default orderRouter;
