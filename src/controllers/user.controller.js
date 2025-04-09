import httpStatus from "http-status";
import { session } from "#middlewares/session";
import UserService from "#services/user";
import Controller from "#controllers/base";
import { sendResponse } from "#utils/response";

class UserController extends Controller {
  static Service = UserService;

  static async login(req, res, next) {
    const loggedInData = await this.Service.login(req.body);
    sendResponse(httpStatus.OK, res, loggedInData, "Logged in successfully");
  }

  static async sendOtp(req, res, next) {
    const otpData = await this.Service.sendOtp(req.body);
    sendResponse(httpStatus.OK, res, otpData, "Otp sent successfully");
  }

  static async getCurrentUser(req, res, next) {
    const userData = session.get("user");
    console.log(userData);
    const user = await this.Service.get(userData._id);
    sendResponse(httpStatus.OK, res, user);
  }

  static async adminLogin(req, res, next) {
    const loggedInData = await this.Service.adminLogin(req.body);
    sendResponse(httpStatus.OK, res, loggedInData, "Logged in successfully");
  }
}

export default UserController;
