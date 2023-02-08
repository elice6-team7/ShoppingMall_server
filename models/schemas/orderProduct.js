import { Schema } from "mongoose";

const OrderProductSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default OrderProductSchema;
