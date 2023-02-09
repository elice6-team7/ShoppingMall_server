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
    type: new Schema(
      {
        sizeS: {
          type: Number,
          required: true,
          min: 0,
        },
        sizeM: {
          type: Number,
          required: true,
          min: 0,
        },
        sizeL: {
          type: Number,
          required: true,
          min: 0,
        },
        sizeXL: {
          type: Number,
          required: true,
          min: 0,
        },
        size2XL: {
          type: Number,
          required: true,
          min: 0,
        },
      },
      { _id: false },
    ),
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default ProductSchema;
