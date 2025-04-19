import AdminService from "#services/admin";
import Controller from "#controllers/base";
import { session } from "#middlewares/session";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";

class AdminController extends Controller {
  static Service = AdminService;

  static async login(req, res, next) {
    const data = await this.Service.login(req.body);
    sendResponse(
      httpStatus.OK,
      res,
      data,
      `${this.Service.Model.updatedName()} loggedIn successfully`,
    );
  }

  static async getCurrentAdmin(req, res, next) {
    const adminId = session.get("adminId");
    const admin = await this.Service.getCurrentAdmin(adminId);
    sendResponse(httpStatus.OK, res, admin);
  }
}

export default AdminController;
