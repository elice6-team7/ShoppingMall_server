import express from "express";
import { productController } from "../controllers";
import { isAdmin } from "../middleware";

const productRouter = express.Router();

productRouter.post("/products/add", isAdmin, productController.addProduct);
productRouter.patch(
  "/products/:productTitle",
  isAdmin,
  productController.setProduct,
);
productRouter.get("/products", productController.getProducts);
productRouter.get(
  "/products/category/:categoryTitle",
  productController.getProductsByCategory,
);
productRouter.get("/products/:productTitle", productController.getProduct);
productRouter.delete(
  "/products/:productTitle",
  isAdmin,
  productController.deleteProduct,
);

export default productRouter;
