import { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default UserSchema;
