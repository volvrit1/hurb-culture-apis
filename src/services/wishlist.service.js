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
    ]);

    return products;
  }
}

export default WishlistService;
