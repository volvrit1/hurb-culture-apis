import BookingService from "#services/booking";
import Controller from "#controllers/base";

class BookingController extends Controller {
  static Service = BookingService;
}

export default BookingController;
