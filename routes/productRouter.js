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
// products 전체 조회는 페이지네이션 (관리자가 볼 거라서)
productRouter.get("/products", productController.getProducts);
// 카테고리 별 조회는 무한 스크롤 (일단 그냥 페이지네이션 구현)
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
