import DoctorService from "#services/doctor";
import Controller from "#controllers/base";

class DoctorController extends Controller {
  static Service = DoctorService;
}

export default DoctorController;
