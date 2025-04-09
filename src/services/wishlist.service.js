import Wishlist from "#models/wishlist";
import BaseService from "#services/base";

class WishlistService extends BaseService {
  static Model = Wishlist;
}

export default WishlistService;
