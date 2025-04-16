import Category from "#models/category";
import BaseService from "#services/base";

class CategoryService extends BaseService {
  static Model = Category;

  static async getWithSubCategories() {}
}

export default CategoryService;
