import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "결제 완료",
      required: true,
    },
    consignee: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    orderProductId: {
      type: Schema.Types.ObjectId,
      ref: "orderProducts",
    },
  },
  { timestamps: true },
);

export default OrderSchema;
