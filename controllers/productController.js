import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { productService } from "../services";

class ProductController {
  constructor(service) {
    this.service = service;
    this.addProduct = this.addProduct.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProductsByCategory = this.getProductsByCategory.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async addProduct(req, res, next) {
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
        title,
        categoryId,
        manufacturer,
        shortDescription,
        detailDescription,
        imageUrl,
        inventory,
        price,
        searchKeywords,
      } = req.body;

      const newProduct = await this.service.addProduct({
        title,
        categoryId,
        manufacturer,
        shortDescription,
        detailDescription,
        imageUrl,
        inventory,
        price,
        searchKeywords,
      });

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  async setProduct(req, res, next) {
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

      const { productId } = req.params;
      const {
        title,
        categoryId,
        manufacturer,
        shortDescription,
        detailDescription,
        imageUrl,
        inventory,
        price,
      } = req.body;

      const result = await this.service.setProduct(productId, {
        title,
        categoryId,
        manufacturer,
        shortDescription,
        detailDescription,
        imageUrl,
        inventory,
        price,
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await this.service.getProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const products = await this.service.getProductsByCategory(categoryId);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const productData = await this.service.getProduct(productId);
      res.status(200).json(productData);
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const result = await this.service.deleteProduct(productId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const productController = new ProductController(productService);

export { productController };
