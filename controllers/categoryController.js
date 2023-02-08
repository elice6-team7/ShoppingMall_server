import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { categoryService } from "../services";

class CategoryController {
  async addCategory(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("json으로 content-type 설정 필요");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation fail, entered data is incorrect.");
        error.status(400);
        throw error;
      }

      const { title } = req.body;
      const newCategory = await categoryService.addCategory({ title });
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req, res, next) {
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
        throw new Error("제대로 된 페이지 별 카테고리 수를 입력해주세요.");
      }
      if (countPerPage < 1) {
        throw new Error("페이지에 카테고리를 적어도 1개 이상 띄워야 합니다.");
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

      const categories = await categoryService.getCategories(
        countPerPage,
        pageNo,
      );
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await categoryService.getCategory(categoryId);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async setCategory(req, res, next) {
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

      const { categoryId } = req.params;
      const { title } = req.body;
      const result = await categoryService.setCategory(categoryId, title);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const result = await categoryService.deleteCategory(categoryId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const categoryController = new CategoryController();

export { categoryController };
