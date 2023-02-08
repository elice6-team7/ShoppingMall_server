import dotenv from "dotenv";
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import {
  adminRouter,
  userRouter,
  productRouter,
  categoryRouter,
  orderRouter,
  orderProductRouter,
} from "./routes";
import { errorHandler, errorLogger } from "./middleware";

// 환경변수 사용
dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
const dirname = path.resolve();
console.log(dirname, "dirname");
app.set("port", process.env.PORT || 8001);

// CORS 에러 방지
app.use(cors());

// logger (morgan)
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, "public")));

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", orderRouter);
app.use("/api", orderProductRouter);

// DB 만들고 연결할 주소
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

// catch 404 and forward to error handler
app.use(errorLogger);
// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기중 🚀`);
});

export default app;
