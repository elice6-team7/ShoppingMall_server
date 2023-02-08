import { Order } from "../models";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async addOrder(orderInfo) {
    const checkOverlap = await this.orderModel.findOne({
      orderNumber: orderInfo.orderNumber,
    });
    if (checkOverlap) {
      throw new Error("주문 번호가 중복되었습니다.");
    }
    const createdNewOrder = await this.orderModel.create(orderInfo);
    return createdNewOrder;
  }

  async getOrderAdmin() {
    const orderList = await this.orderModel.find();
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
