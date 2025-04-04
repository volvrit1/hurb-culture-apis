import Booking from "#models/booking";
import BaseService from "#services/base";

class BookingService extends BaseService {
  static Model = Booking;
}

export default BookingService;
