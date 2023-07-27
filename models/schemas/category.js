import { Schema } from "mongoose";

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

export default CategorySchema;
