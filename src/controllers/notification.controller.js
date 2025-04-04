import NotificationService from "#services/notification";
import Controller from "#controllers/base";

class NotificationController extends Controller {
  static Service = NotificationService;
}

export default NotificationController;
