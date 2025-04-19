import SubCategory from "#models/subCategory";
import BaseService from "#services/base";

class SubCategoryService extends BaseService {
  static Model = SubCategory;

  static async get(id, filters) {
    const initialStage = [
      {
        $lookup: {
          from: "categories",
          as: "categoryData",
          localField: "categoryId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          name: 1,
          photo: 1,
          categoryName: { $arrayElemAt: ["$categoryData.name", 0] },
          status: 1,
          createdAt: 1,
        },
      },
    ];

    if (!id) {
      return await this.Model.findAll(filters, initialStage, extraStage);
    }

    return await this.Model.findDocById(id);
  }
}

export default SubCategoryService;
