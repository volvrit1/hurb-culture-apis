import OtpService from "#services/otp";
import Controller from "#controllers/base";

class OtpController extends Controller {
  static Service = OtpService;
}

export default OtpController;
