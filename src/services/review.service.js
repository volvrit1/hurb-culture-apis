import Review from "#models/review";
import BaseService from "#services/base";

class ReviewService extends BaseService {
  static Model = Review;

  static async get(id, filters) {
    const initialStage = [
      {
        $lookup: {
          from: "users",
          as: "userData",
          localField: "userId",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "products",
          as: "productData",
          localField: "productId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          rating: 1,
          userName: { $arrayElemAt: ["$userData.name", 0] },
          userProfile: { $arrayElemAt: ["$userData.profile", 0] },
          status: 1,
          createdAt: 1,
          productName: { $arrayElemAt: ["$productData.name", 0] },
          review: 1,
        },
      },
    ];

    if (!id) {
      return await this.Model.findAll(filters, initialStage, extraStage);
    }

    return await super.get(id);
  }
}

export default ReviewService;
