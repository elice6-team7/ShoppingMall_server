import express from "express";
import { productController } from "../controllers";
import { isAdmin } from "../middleware";

const productRouter = express.Router();

productRouter.post("/products/add", isAdmin, productController.addProduct);
productRouter.patch(
  "/products/:productId",
  isAdmin,
  productController.setProduct,
);
//
productRouter.get("/products", productController.getProducts);
//
productRouter.get(
  "/products/category/:categoryId",
  productController.getProductsByCategory,
);
productRouter.get("/products/:productId", productController.getProduct);
productRouter.delete(
  "/products/:productId",
  isAdmin,
  productController.deleteProduct,
);

export default productRouter;
