import BlogCategoryService from "#services/blogCategory";
import Controller from "#controllers/base";

class BlogCategoryController extends Controller {
  static Service = BlogCategoryService;
}

export default BlogCategoryController;
