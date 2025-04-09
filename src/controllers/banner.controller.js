import BannerService from "#services/banner";
import Controller from "#controllers/base";

class BannerController extends Controller {
  static Service = BannerService;
}

export default BannerController;
