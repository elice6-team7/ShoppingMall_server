import { Product, Category } from "../models";

class CategoryService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  // 카테고리 추가
  async addCategory(categoryInfo) {
    const { title } = categoryInfo;

    // 카테고리 중복 확인
    const founded = await this.categoryModel.findOne({ title });
    if (founded) {
      throw new Error(`${title} 카테고리가 존재합니다.`);
    }

    const createdNewCategory = await this.categoryModel.create(categoryInfo);
    return createdNewCategory;
  }

  // 카테고리 목록 조회
  async getCategories() {
    const categories = await this.categoryModel.find({});

    if (!categories) {
      throw new Error("어떤 카테고리도 존재하지 않습니다.");
    }

    return categories;
  }

  // 특정 카테고리 조회
  async getCategory(id) {
    const category = await this.categoryModel.findOne({ _id: id });

    if (!category) {
      throw new Error(`해당 카테고리가 존재하지 않습니다.`);
    }

    return category;
  }

  // 카테고리 수정
  async setCategory(id, title) {
    const category = await this.categoryModel.findOne({ _id: id });

    if (!category) {
      throw new Error(`해당 카테고리가 존재하지 않습니다.`);
    }

    if (category.title !== title) {
      const founded = await this.categoryModel.findOne({ title });
      if (founded) {
        throw new Error(
          `${title} 이름의 카테고리가 존재합니다. 다른 이름으로 수정해주세요.`,
        );
      }
    }

    const updated = await this.categoryModel.updateOne(
      { _id: id },
      { $set: { title } },
    );

    let result = `수정이 완료 되었습니다.`;
    if (updated.modifiedCount === 0) {
      result = `수정된 내용이 없습니다.`;
    }
    return result;
  }

  // 카테고리 삭제
  async deleteCategory(id) {
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category) {
      throw new Error(`해당 카테고리가 존재하지 않습니다.`);
    }

    const { title } = category;
    const product = await this.productModel.findOne({ categoryId: id });

    if (product) {
      throw new Error(`${title} 카테고리에 제품이 있어 삭제가 불가합니다.`);
    }

    const { deletedCount } = await this.categoryModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new Error(`${title} 카테고리 삭제에 실패했습니다.`);
    }

    return { result: `${title} 카테고리 삭제 완료` };
  }
}

const categoryService = new CategoryService(Product, Category);

export { categoryService };
