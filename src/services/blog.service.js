import Blog from "#models/blog";
import BaseService from "#services/base";

class BlogService extends BaseService {
  static Model = Blog;
}

export default BlogService;
