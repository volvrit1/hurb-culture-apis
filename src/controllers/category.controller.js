import CategoryService from "#services/category";
import { sendResponse } from "#utils/response";
import httpStatus from "http-status";
import Controller from "#controllers/base";

class CategoryController extends Controller {
  static Service = CategoryService;

  static async getWithSubCategory(req, res, next) {
    const data = await this.Service.getWithSubCategory();
    sendResponse(httpStatus.OK, res, data);
  }
}

export default CategoryController;
