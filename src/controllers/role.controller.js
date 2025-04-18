import RoleService from "#services/role";
import Controller from "#controllers/base";

class RoleController extends Controller {
  static Service = RoleService;
}

export default RoleController;
