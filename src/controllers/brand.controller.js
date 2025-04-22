import BrandService from "#services/brand";
import { sendResponse } from "#utils/response";
import httpStatus from "http-status";
import Controller from "#controllers/base";

class BrandController extends Controller {
  static Service = BrandService;

  static async login(req, res, next) {
    const data = await this.Service.login(req.body);
    sendResponse(
      httpStatus.OK,
      res,
      data,
      `${this.Service.Model.updatedName()} loggedIn successfully`,
    );
  }

  static async getCurrentBrand(req, res, next) {
    const brandId = session.get("brandId");
    const brand = await this.Service.getCurrentBrand(brandId);
    sendResponse(httpStatus.OK, res, brand);
  }
}

export default BrandController;
