import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { productService } from "../services";

class ProductController {
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

      const newProduct = await productService.addProduct({
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

      const { productTitle } = req.params;
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

      const result = await productService.setProduct(productTitle, {
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

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      const { categoryTitle } = req.params;
      const products = await productService.getProductsByCategory(
        categoryTitle,
      );
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { productTitle } = req.params;
      const productData = await productService.getProduct(productTitle);
      res.status(200).json(productData);
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productTitle } = req.params;
      const result = await productService.deleteProduct(productTitle);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const productController = new ProductController();

export { productController };
