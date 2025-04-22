import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import BrandController from "#controllers/brand";
import Brand from "#models/brand";

const router = express.Router();

router
  .route("/login")
  .post(asyncHandler(BrandController.login.bind(BrandController)));

router
  .route("/:id?")
  .get(asyncHandler(BrandController.get.bind(BrandController)))
  .post(
    validator(Brand),
    asyncHandler(BrandController.create.bind(BrandController)),
  )
  .put(
    validator(Brand, true),
    asyncHandler(BrandController.update.bind(BrandController)),
  )
  .delete(asyncHandler(BrandController.deleteDoc.bind(BrandController)));

export default router;
