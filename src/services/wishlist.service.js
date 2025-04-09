import Wishlist from "#models/wishlist";
import httpStatus from "http-status";
import BaseService from "#services/base";
import ProductService from "#services/product";

class WishlistService extends BaseService {
  static Model = Wishlist;

  static async get(id, filters) {
    if (!id) {
      const initialStage = [
        {
          $lookup: {
            from: "users",
            as: "userData",
            localField: "userId",
            foreignField: "_id",
          },
        },
      ];

      const extraStage = [
        {
          $project: {
            userName: { $arrayElemAt: ["$userData.name", 0] },
          },
        },
      ];

      const wishlist = await this.Model.findAll(
        filters,
        initialStage,
        extraStage,
      );

      return wishlist;
    }

    const wishlist = await this.Model.findDoc(id);

    if (!wishlist.productIds.length) {
      throw {
        status: false,
        message: "Wishlist is empty",
        httpStatus: httpStatus.OK,
      };
    }

    const products = await ProductService.getWithAggregate([
      {
        $match: {
          _id: { $in: wishlist.productIds },
        },
      },
      {
        $project: {
          name: 1,
          discountedPrice: 1,
          rating: "4",
          coverImage: 1,
        },
      },
    ]);

    return products[0];
  }

  static async getByUserId(userId) {
    const wishlist = await this.Model.getWithAggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (!wishlist.length) {
      throw {
        status: false,
        message,
      };
    }

    const products = await ProductService.getWithAggregate([
      {
        $match: {
          _id: { $in: wishlist.productIds },
        },
      },
      {
        $project: {
          name: 1,
          discountedPrice: 1,
          rating: "4",
          coverImage: 1,
        },
      },
    ]);

    return products;
  }
}

export default WishlistService;
