import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import BannerController from "#controllers/banner";
import Banner from "#models/banner";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BannerController.get.bind(BannerController)))
  .post(
    validator(Banner),
    asyncHandler(BannerController.create.bind(BannerController)),
  )
  .put(
    validator(Banner, true),
    asyncHandler(BannerController.update.bind(BannerController)),
  )
  .delete(asyncHandler(BannerController.deleteDoc.bind(BannerController)));

export default router;
