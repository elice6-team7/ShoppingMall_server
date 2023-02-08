import { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  detailDescription: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  inventory: {
    type: Number,
    required: true,
    default: 10,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  searchKeywords: {
    type: [String],
    required: true,
  },
});

export default ProductSchema;
