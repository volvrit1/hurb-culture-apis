import AdminService from "#services/admin";
import Controller from "#controllers/base";

class AdminController extends Controller {
  static Service = AdminService;
}

export default AdminController;
