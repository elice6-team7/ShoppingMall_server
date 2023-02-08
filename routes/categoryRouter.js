import express from "express";
import { categoryController } from "../controllers/categoryController";
import { isAdmin } from "../middleware";

const categoryRouter = express.Router();

categoryRouter.post("/categories", isAdmin, categoryController.addCategory);
categoryRouter.patch(
  "/categories/:categoryTitle",
  isAdmin,
  categoryController.setCategory,
);
categoryRouter.get("/categories", categoryController.getCategories);
categoryRouter.get(
  "/categories/:categoryTitle",
  categoryController.getCategory,
);
categoryRouter.delete(
  "/categories/:categoryTitle",
  isAdmin,
  categoryController.deleteCategory,
);

export default categoryRouter;
