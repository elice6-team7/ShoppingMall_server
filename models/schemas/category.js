import { Schema } from "mongoose";

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // empty: 전체 카테고리 조회할 때만 업데이트, 카테고리 가림 여부 판단
  empty: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export default CategorySchema;
