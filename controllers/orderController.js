import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { orderService } from "../services";

class OrderController {
  async addOrder(req, res, next) {
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

      const {
        orderNumber,
        userId,
        consignee,
        address1,
        address2,
        zipcode,
        phoneNumber,
      } = req.body;

      const newOrder = await orderService.addOrder({
        orderNumber,
        userId,
        consignee,
        address1,
        address2,
        zipcode,
        phoneNumber,
      });
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }

  async getOrderAdmin(req, res, next) {
    try {
      const orderList = await orderService.getOrderAdmin();
      res.status(200).json(orderList);
    } catch (err) {
      next(err);
    }
  }

  async getOrderUser(req, res, next) {
    try {
      const { userId } = req.params;
      const orderList = await orderService.getOrderUser(userId);
      res.status(200).json(orderList);
    } catch (err) {
      next(err);
    }
  }

  async setOrder(req, res, next) {
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

      const { orderId } = req.params;
      const { status, consignee, address1, address2, zipcode, phoneNumber } =
        req.body;
      const changeInfo = {
        ...(status && { status }),
        ...(consignee && { consignee }),
        ...(address1 && { address1 }),
        ...(address2 && { address2 }),
        ...(zipcode && { zipcode }),
        ...(phoneNumber && { phoneNumber }),
      };

      const changedOrder = await orderService.setOrder(orderId, changeInfo);
      res.status(200).json(changedOrder);
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const deleteResult = await orderService.deleteOrder(orderId);

      res.status(200).json(deleteResult);
    } catch (err) {
      next(err);
    }
  }
}

const orderController = new OrderController();

export { orderController };
