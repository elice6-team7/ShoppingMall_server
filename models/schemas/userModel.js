import { model } from "mongoose";
import UserSchema from "./user";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async deleteById(userId) {
    const result = await User.deleteOne({ _id: userId });
    return result;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const updatedUser = await User.update(filter, { $set: update });
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
