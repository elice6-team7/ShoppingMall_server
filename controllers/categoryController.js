import is from "@sindresorhus/is";
import { validationResult } from "express-validator";
import { categoryService } from "../services";

class CategoryController {
  constructor(service) {
    this.service = service;
    this.addCategory = this.addCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

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
      const newCategory = await this.service.addCategory({ title });
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await this.service.getCategories();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await this.service.getCategory(categoryId);
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
      const result = await this.service.setCategory(categoryId, title);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const result = await this.service.deleteCategory(categoryId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const categoryController = new CategoryController(categoryService);

export { categoryController };
