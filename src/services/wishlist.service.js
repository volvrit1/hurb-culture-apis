import Wishlist from "#models/wishlist";
import BaseService from "#services/base";
import ProductService from "#services/product";

class WishlistService extends BaseService {
  static Model = Wishlist;

  static async get(id, filters) {
    if (!id) {
    }

    const wishlist = await this.Model.findDoc(id);

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
