import Product from "#models/product";
import BaseService from "#services/base";

class ProductService extends BaseService {
  static Model = Product;

  static async get(id, filters) {
    const initialStage = [
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategoryData",
        },
      },
    ];
    const extraStage = [
      {
        $project: {
          name: 1,
          categoryName: { $arrayElemAt: ["$categoryData.name", 0] },
          subCategoryName: { $arrayElemAt: ["$subCategoryData.name", 0] },
          price: 1,
          discountedPrice: 1,
          quantity: 1,
          coverImage: 1,
        },
      },
    ];

    if (!id) {
      return await this.Model.findAll(filters, initialStage, extraStage);
    }
    return await super.get(id);
  }
}

export default ProductService;
