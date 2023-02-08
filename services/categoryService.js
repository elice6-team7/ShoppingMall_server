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
  async getCategory(title) {
    const category = await this.categoryModel.findOne({ title });

    if (!category) {
      throw new Error(`${title} 카테고리가 존재하지 않습니다.`);
    }

    return category;
  }

  // 카테고리 수정
  async setCategory(title, updatedTitle) {
    const category = await this.categoryModel.findOne({ title });

    if (!category) {
      throw new Error(`${title} 카테고리가 존재하지 않습니다.`);
    }

    if (title !== updatedTitle) {
      const founded = await this.categoryModel.findOne({ title: updatedTitle });
      if (founded) {
        throw new Error(
          `${updatedTitle} 이름의 카테고리가 존재합니다. 다른 이름으로 수정해주세요.`,
        );
      }
    }

    const updated = await this.categoryModel.updateOne(
      { title },
      { $set: { title: updatedTitle } },
    );

    let result = `수정이 완료 되었습니다.`;
    if (updated.modifiedCount === 0) {
      result = `수정된 내용이 없습니다.`;
    }
    return result;
  }

  // 카테고리 삭제
  async deleteCategory(title) {
    const category = await this.categoryModel.findOne({ title });
    if (!category) {
      throw new Error(`${title} 카테고리가 존재하지 않습니다.`);
    }

    const product = await this.productModel.findOne({
      categoryId: category.id,
    });
    if (product) {
      throw new Error(`${title} 카테고리에 제품이 있어 삭제가 불가합니다.`);
    }

    const { deletedCount } = await this.categoryModel.deleteOne({
      _id: category.id,
    });
    if (deletedCount === 0) {
      throw new Error(`${title} 카테고리 삭제에 실패했습니다.`);
    }

    return { result: `${title} 카테고리 삭제 완료` };
  }
}

const categoryService = new CategoryService(Product, Category);

export { categoryService };
