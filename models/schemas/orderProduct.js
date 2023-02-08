import { Schema } from "mongoose";

const OrderProductSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "orders",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default OrderProductSchema;
