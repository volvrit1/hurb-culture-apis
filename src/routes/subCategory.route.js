import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import SubCategoryController from "#controllers/subCategory";
import SubCategory from "#models/subCategory";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(SubCategoryController.get.bind(SubCategoryController)))
  .post(
    validator(SubCategory),
    asyncHandler(SubCategoryController.create.bind(SubCategoryController)),
  )
  .put(
    validator(SubCategory, true),
    asyncHandler(SubCategoryController.update.bind(SubCategoryController)),
  )
  .delete(
    asyncHandler(SubCategoryController.deleteDoc.bind(SubCategoryController)),
  );

export default router;
