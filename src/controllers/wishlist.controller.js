import WishlistService from "#services/wishlist";
import Controller from "#controllers/base";

class WishlistController extends Controller {
  static Service = WishlistService;
}

export default WishlistController;
