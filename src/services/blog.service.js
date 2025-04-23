import Blog from "#models/blog";
import BaseService from "#services/base";

class BlogService extends BaseService {
  static Model = Blog;

  static async get(id, filters) {
    const initialStage = [
      {
        $lookup: {
          from: "blogcategories",
          as: "blogCategoryData",
          localField: "blogCategoryId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          title: 1,
          slug: 1,
          description: 1,
          coverImage: 1,
          blogCategoryName: "$blogCategoryData.name",
          status: 1,
          createdAt: 1,
        },
      },
    ];

    if (!id) {
      return await this.Model.findAll(filters, initialStage, extraStage);
    }
    return await this.Model.findDocById(id);
  }
}

export default BlogService;
