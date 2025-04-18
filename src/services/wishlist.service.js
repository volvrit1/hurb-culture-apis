import Wishlist from "#models/wishlist";
import mongoose from "mongoose";
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

    const wishlist = await this.Model.findDocById(id);

    if (!wishlist.productIds.length) {
      return wishlist;
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
    let wishlist = await this.Model.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (!wishlist.length) {
      wishlist = await this.Model.create({ userId });
      wishlist = wishlist.toJSON();
      wishlist.wishlistId = wishlist._id;
      return wishlist;
    }

    wishlist = wishlist[0];

    if (!wishlist.productIds.length) {
      wishlist.wishlistId = wishlist._id;
      return wishlist;
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

    return {
      wishlistId: wishlist._id,
      products,
    };
  }
}

export default WishlistService;
