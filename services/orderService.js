import { Order } from "../models";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
    this.addOrder = this.addOrder.bind(this);
    this.getOrderAdmin = this.getOrderAdmin.bind(this);
    this.getOrderUser = this.getOrderUser.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  async addOrder(orderInfo) {
    const createdNewOrder = await this.orderModel.create(orderInfo);
    return createdNewOrder;
  }

  async getOrderAdmin() {
    const orderList = await this.orderModel.find().populate("userId");
    return orderList;
  }

  async getOrderUser(userId) {
    const orderList = await this.orderModel.find({ userId });
    return orderList;
  }

  async setOrder(orderId, changeInfo) {
    const order = await this.orderModel.findOne({ _id: orderId });
    if (!order) {
      throw new Error("주문이 존재하지 않습니다.");
    }

    const changedOrder = await this.orderModel.updateOne(
      { _id: orderId },
      { $set: changeInfo },
    );
    return changedOrder;
  }

  async deleteOrder(orderId) {
    const { deletedCount } = await this.orderModel.deleteOne({ _id: orderId });

    if (deletedCount === 0) {
      throw new Error("주문 삭제에 실패했습니다.");
    }

    return { result: "주문 삭제 완료" };
  }
}

const orderService = new OrderService(Order);

export { orderService };
