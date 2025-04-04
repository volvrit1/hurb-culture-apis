import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import OtpController from "#controllers/otp";
import Otp from "#models/otp";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(OtpController.get.bind(OtpController)))
  .post(validator(Otp), asyncHandler(OtpController.create.bind(OtpController)))
  .put(
    validator(Otp, true),
    asyncHandler(OtpController.update.bind(OtpController)),
  )
  .delete(asyncHandler(OtpController.deleteDoc.bind(OtpController)));

export default router;
