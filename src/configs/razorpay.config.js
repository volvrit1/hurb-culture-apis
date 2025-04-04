import env from "#configs/env";
import Razorpay from "razorpay";

const razor = new Razorpay({
  key_id: env.RAZORPAY_ID,
  key_secret: env.RAZORPAY_SECRET,
});

export default razor;
