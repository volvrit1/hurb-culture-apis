import express from "express";
import Review from "#models/review";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import ReviewController from "#controllers/review";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(ReviewController.get.bind(ReviewController)))
  .post(
    validator(Review),
    asyncHandler(ReviewController.create.bind(ReviewController)),
  )
  .put(
    validator(Review, true),
    asyncHandler(ReviewController.update.bind(ReviewController)),
  )
  .delete(asyncHandler(ReviewController.deleteDoc.bind(ReviewController)));

export default router;
