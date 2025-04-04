import ReviewService from "#services/review";
import Controller from "#controllers/base";

class ReviewController extends Controller {
  static Service = ReviewService;
}

export default ReviewController;
