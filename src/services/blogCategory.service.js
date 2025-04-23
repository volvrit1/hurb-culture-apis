import BlogCategory from "#models/blogCategory";
import BaseService from "#services/base";

class BlogCategoryService extends BaseService {
  static Model = BlogCategory;
}

export default BlogCategoryService;
