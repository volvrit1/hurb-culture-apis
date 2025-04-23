import Testimonial from "#models/testimonial";
import BaseService from "#services/base";

class TestimonialService extends BaseService {
  static Model = Testimonial;
}

export default TestimonialService;
