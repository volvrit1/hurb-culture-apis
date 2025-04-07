import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import DoctorController from "#controllers/doctor";
import Doctor from "#models/doctor";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(DoctorController.get.bind(DoctorController)))
  .post(
    validator(Doctor),
    asyncHandler(DoctorController.create.bind(DoctorController)),
  )
  .put(
    validator(Doctor, true),
    asyncHandler(DoctorController.update.bind(DoctorController)),
  )
  .delete(asyncHandler(DoctorController.deleteDoc.bind(DoctorController)));

export default router;
