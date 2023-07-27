import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { orderProductService } from "../services";

class OrderProductController {
  constructor(service) {
    this.service = service;
    this.addOrderProduct = this.addOrderProduct.bind(this);
    this.getOrderProduct = this.getOrderProduct.bind(this);
    this.deleteOrderProduct = this.deleteOrderProduct.bind(this);
  }

  async addOrderProduct(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("json으로 contetn-type 설정 필요");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation fail, entered data is incorrect.");
        error.status(400);
        throw error;
      }

      const { orderId, productId, productQuantity, productSize } = req.body;

      const newOrderProduct = await this.service.addOrderProduct({
        orderId,
        productId,
        productQuantity,
        productSize,
      });
      res.status(201).json(newOrderProduct);
    } catch (err) {
      next(err);
    }
  }

  async getOrderProduct(req, res, next) {
    try {
      const { orderId } = req.params;
      const productList = await this.service.getOrderProduct(orderId);
      res.status(200).json(productList);
    } catch (err) {
      next(err);
    }
  }

  async deleteOrderProduct(req, res, next) {
    try {
      const { orderId } = req.params;
      const deleteResult = await this.service.deleteOrderProduct(orderId);

      res.status(200).json(deleteResult);
    } catch (err) {
      next(err);
    }
  }
}

const orderProductController = new OrderProductController(orderProductService);

export { orderProductController };
