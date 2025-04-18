import BrandService from "#services/brand";
import Controller from "#controllers/base";

class BrandController extends Controller {
  static Service = BrandService;
}

export default BrandController;
