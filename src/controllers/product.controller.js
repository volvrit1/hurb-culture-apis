import ProductService from "#services/product";
import Controller from "#controllers/base";

class ProductController extends Controller {
  static Service = ProductService;
}

export default ProductController;
