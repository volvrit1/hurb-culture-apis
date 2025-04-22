import Category from "#models/category";
import BaseService from "#services/base";

class CategoryService extends BaseService {
  static Model = Category;

  static async getWithSubCategory() {
    const data = await this.Model.aggregate([
      {
        $match: {
          status: true,
        },
      },
      {
        $lookup: {
          from: "subcategories",
          as: "subCategories",
          localField: "_id",
          foreignField: "categoryId",
          pipeline: [
            {
              $match: {
                status: true,
              },
            },
            {
              $project: {
                name: 1,
                photo: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          photo: 1,
          subCategories: 1,
        },
      },
    ]);

    return data;
  }
}

export default CategoryService;
