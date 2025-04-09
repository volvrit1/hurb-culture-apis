import AddressService from "#services/address";
import Controller from "#controllers/base";

class AddressController extends Controller {
  static Service = AddressService;
}

export default AddressController;
