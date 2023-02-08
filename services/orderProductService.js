import { OrderProduct, Order, Product } from "../models";

class OrderProductService {
  constructor(orderProductModel, orderModel, productModel) {
    this.orderProductModel = orderProductModel;
    this.orderModel = orderModel;
    this.productModel = productModel;
  }

  async addOrderProduct(orderProductInfo) {
    const { productId, productQuantity } = orderProductInfo;
    const product = await this.productModel.findOne({ _id: productId });
    if (!product) {
      throw new Error("주문 상품이 존재하지 않습니다.");
    }
    if (productQuantity <= 0 || productQuantity % 1 !== 0) {
      throw new Error("주문 수량이 잘못되었습니다.");
    }
    if (product.inventory < productQuantity || product.inventory === 0) {
      throw new Error("상품 수량이 부족합니다.");
    }

    const updateProductInventory = product.inventory - productQuantity;
    await this.productModel.updateOne(
      { _id: productId },
      { inventory: updateProductInventory },
    );

    const createdNewOrderProduct = await this.orderProductModel.create(
      orderProductInfo,
    );

    return createdNewOrderProduct;
  }

  async getOrderProduct(orderId) {
    const orderProductList = await this.orderProductModel
      .find({ orderId })
      .populate("productId");
    return orderProductList;
  }

  async deleteOrderProduct(orderId) {
    const orderProductList = await this.orderProductModel.find({ orderId });
    const { orderNumber } = await this.orderModel.findOne({ _id: orderId });
    let deletedCountAll = 0;

    for (let orderProduct of orderProductList) {
      const { productId, productQuantity } = orderProduct;
      const product = await this.productModel.findOne({ _id: productId });

      if (!product) {
        throw new Error("주문 상품이 존재하지 않습니다.");
      }

      const updateProductInventory = product.inventory + productQuantity;
      await this.productModel.updateOne(
        { _id: productId },
        { inventory: updateProductInventory },
      );

      const { deletedCount } = await this.orderProductModel.deleteOne({
        _id: orderProduct._id,
      });

      if (deletedCount === 0) {
        throw new Error("주문 상품 삭제에 실패했습니다.");
      }
      deletedCountAll += 1;
    }

    if (deletedCountAll === 0) {
      throw new Error(`${orderNumber}번 주문에서 삭제할 상품이 없습니다.`);
    }

    return { result: `${orderNumber}번 주문 상품 삭제 완료` };
  }
}

const orderProductService = new OrderProductService(
  OrderProduct,
  Order,
  Product,
);

export { orderProductService };
