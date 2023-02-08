import { Product, Category } from "../models";

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  // 상품 추가
  async addProduct(productInfo) {
    const { title } = productInfo;

    // 상품 중복 확인
    const founded = await this.productModel.findOne({ title });
    if (founded) {
      throw new Error(`${title} 상품이 존재합니다.`);
    }

    // DB 저장
    const createdNewProduct = await this.productModel.create(productInfo);
    return createdNewProduct;
  }

  // 상품 수정
  async setProduct(id, toUpdateInfo) {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new Error(`해당 상품이 존재하지 않습니다.`);
    }

    if (toUpdateInfo.title !== product.title) {
      const founded = await this.productModel.findOne({
        title: toUpdateInfo.title,
      });

      if (founded) {
        throw new Error(
          `${toUpdateInfo.title} 이름의 상품이 존재합니다. 다른 이름으로 수정해주세요.`,
        );
      }
    }

    const updated = await this.productModel.updateOne(
      { _id: id },
      { $set: toUpdateInfo },
    );

    let result = `수정이 완료 되었습니다.`;
    if (updated.modifiedCount === 0) {
      result = `수정된 내용이 없습니다.`;
    }

    return result;
  }

  // 상품 삭제
  async deleteProduct(id) {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new Error(`해당 상품이 존재하지 않습니다.`);
    }

    const { title } = product;

    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new Error(`${title} 상품 삭제에 실패했습니다.`);
    }

    return { result: `${title} 상품 삭제 완료` };
  }

  // 상품 전체 조회
  async getProducts() {
    const products = await this.productModel.find({}).populate("categoryId");
    return products;
  }

  // 상품 카테고리별 조회
  async getProductsByCategory(id) {
    const category = await this.categoryModel.findOne({ _id: id });
    // 카테고리가 없다면
    if (!category) {
      throw new Error(`해당 카테고리가 존재하지 않습니다.`);
    }
    const products = await this.productModel
      .find({ categoryId: id })
      .populate("categoryId");
    return products;
  }

  // 특정 상품 조회
  async getProduct(id) {
    const product = await this.productModel
      .findOne({ _id: id })
      .populate("categoryId");
    // 상품이 없다면
    if (!product) {
      throw new Error(`해당 상품이 존재하지 않습니다.`);
    }
    return product;
  }
}

const productService = new ProductService(Product, Category);

export { productService };
