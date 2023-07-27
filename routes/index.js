import express from "express";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import orderRouter from "./orderRouter";
import orderProductRouter from "./orderProductRouter";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";

export {
  adminRouter,
  userRouter,
  productRouter,
  categoryRouter,
  orderRouter,
  orderProductRouter,
};
