import TestimonialService from "#services/testimonial";
import Controller from "#controllers/base";

class TestimonialController extends Controller {
  static Service = TestimonialService;
}

export default TestimonialController;
