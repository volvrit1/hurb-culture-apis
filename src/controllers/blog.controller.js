import BlogService from "#services/blog";
import Controller from "#controllers/base";

class BlogController extends Controller {
  static Service = BlogService;
}

export default BlogController;
