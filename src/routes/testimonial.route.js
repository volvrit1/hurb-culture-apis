import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import TestimonialController from "#controllers/testimonial";
import Testimonial from "#models/testimonial";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(TestimonialController.get.bind(TestimonialController)))
  .post(
    validator(Testimonial),
    asyncHandler(TestimonialController.create.bind(TestimonialController)),
  )
  .put(
    validator(Testimonial, true),
    asyncHandler(TestimonialController.update.bind(TestimonialController)),
  )
  .delete(
    asyncHandler(TestimonialController.deleteDoc.bind(TestimonialController)),
  );

export default router;
