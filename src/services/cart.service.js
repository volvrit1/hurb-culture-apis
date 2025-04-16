import Cart from "#models/cart";
import mongoose from "mongoose";
import httpStatus from "http-status";
import BaseService from "#services/base";
import ProductService from "#services/product";

class CartService extends BaseService {
  static Model = Cart;

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

      const cart = await this.Model.findAll(filters, initialStage, extraStage);

      return cart;
    }

    const cart = await this.Model.findDocById(id);

    if (!cart.productIds.length) {
      throw {
        status: false,
        message: "Cart is empty",
        httpStatus: httpStatus.OK,
      };
    }

    const products = await ProductService.getWithAggregate([
      {
        $match: {
          _id: { $in: cart.productIds },
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
    let cart = await this.Model.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (!cart.length) {
      throw {
        status: false,
        message: "No cart found for this user",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    cart = cart[0];

    if (!cart.productIds.length) {
      throw {
        status: true,
        message: "Cart is empty",
        httpStatus: httpStatus.OK,
      };
    }

    const products = await ProductService.getWithAggregate([
      {
        $match: {
          _id: { $in: cart.productIds },
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
      cartId: cart._id,
      products,
    };
  }
}

export default CartService;
