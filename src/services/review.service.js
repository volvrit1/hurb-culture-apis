import Review from "#models/review";
import BaseService from "#services/base";

class ReviewService extends BaseService {
  static Model = Review;
}

export default ReviewService;
