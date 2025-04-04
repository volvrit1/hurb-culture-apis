import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import BookingController from "#controllers/booking";
import Booking from "#models/booking";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BookingController.get.bind(BookingController)))
  .post(
    validator(Booking),
    asyncHandler(BookingController.create.bind(BookingController)),
  )
  .put(
    validator(Booking, true),
    asyncHandler(BookingController.update.bind(BookingController)),
  )
  .delete(asyncHandler(BookingController.deleteDoc.bind(BookingController)));

export default router;
