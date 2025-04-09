import WishlistService from "#services/wishlist";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";
import Controller from "#controllers/base";

class WishlistController extends Controller {
  static Service = WishlistService;

  static async getByUserId(req, res, next) {
    const { id: userId } = req.params;
    const data = await this.Service.getByUserId(userId);
    sendResponse(
      httpStatus.CREATED,
      res,
      data,
      `${this.Service.Model.updatedName()} created successfully`,
    );
  }
}

export default WishlistController;
