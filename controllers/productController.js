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
        // searchKeywords,
      } = req.body;

      const result = await productService.setProduct(productId, {
        title,
        categoryId,
        manufacturer,
        shortDescription,
        detailDescription,
        imageUrl,
        inventory,
        price,
        // searchKeywords,
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      let { pageNo } = req.query;
      let products = [];
      if (!pageNo) {
        products = await productService.getProducts();
      } else {
        pageNo = Number(pageNo);
        if (Number.isNaN(pageNo)) {
          throw new Error("제대로 된 페이지 번호를 입력해주세요.");
        }
        if (pageNo < 1) {
          throw new Error("페이지 번호는 0보다 커야 합니다.");
        }
        products = await productService.getProductsPerPage(pageNo);
      }
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  //
  async getProductsByCategory(req, res, next) {
    try {
      let { pageNo } = req.query;
      const { categoryId } = req.params;
      let products = [];
      if (!pageNo) {
        products = await productService.getProductsByCategory(categoryId);
      } else {
        pageNo = Number(pageNo);
        if (Number.isNaN(pageNo)) {
          throw new Error("제대로 된 페이지 번호를 입력해주세요.");
        }
        if (pageNo < 1) {
          throw new Error("페이지 번호는 0보다 커야 합니다.");
        }
        products = await productService.getProductsByCategoryPerPage(
          pageNo,
          categoryId,
        );
      }
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const productData = await productService.getProduct(productId);
      res.status(200).json(productData);
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const result = await productService.deleteProduct(productId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const productController = new ProductController();

export { productController };
