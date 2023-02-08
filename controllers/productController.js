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
      let countPerPage = req.query.countperpage;
      let pageNo = req.query.pageno;

      // countPerPage default=10
      if (!countPerPage) {
        countPerPage = 10;
      } else {
        countPerPage = parseInt(countPerPage);
      }
      if (Number.isNaN(countPerPage)) {
        throw new Error("제대로 된 페이지 별 상품 수를 입력해주세요.");
      }
      if (countPerPage < 1) {
        throw new Error("페이지에 상품을 적어도 1개 이상 띄워야 합니다.");
      }

      // pageNo=0: total, pageNo>=1: documents per page
      if (!pageNo) {
        pageNo = 0;
      } else {
        pageNo = parseInt(pageNo);
      }
      if (Number.isNaN(pageNo)) {
        throw new Error("제대로 된 페이지 번호를 입력해주세요.");
      }
      if (pageNo < 0) {
        throw new Error("페이지 번호는 0보다 크거나 같아야 합니다.");
      }

      const products = await productService.getProducts(countPerPage, pageNo);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      let countPerPage = req.query.countperpage;
      let pageNo = req.query.pageno;

      // countPerPage default=10
      if (!countPerPage) {
        countPerPage = 10;
      } else {
        countPerPage = parseInt(countPerPage);
      }
      if (Number.isNaN(countPerPage)) {
        throw new Error("제대로 된 페이지 별 상품 수를 입력해주세요.");
      }
      if (countPerPage < 1) {
        throw new Error("페이지에 상품을 적어도 1개 이상 띄워야 합니다.");
      }

      // pageNo=0: total, pageNo>=1: documents per page
      if (!pageNo) {
        pageNo = 0;
      } else {
        pageNo = parseInt(pageNo);
      }
      if (Number.isNaN(pageNo)) {
        throw new Error("제대로 된 페이지 번호를 입력해주세요.");
      }
      if (pageNo < 0) {
        throw new Error("페이지 번호는 0보다 크거나 같아야 합니다.");
      }

      const { categoryId } = req.params;
      const products = await productService.getProductsByCategory(
        countPerPage,
        pageNo,
        categoryId,
      );
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
