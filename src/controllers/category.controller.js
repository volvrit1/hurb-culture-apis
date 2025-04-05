import CategoryService from "#services/category";
import Controller from "#controllers/base";

class CategoryController extends Controller {
  static Service = CategoryService;
}

export default CategoryController;
