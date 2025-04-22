import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import CategoryController from "#controllers/category";
import Category from "#models/category";

const router = express.Router();

router
  .route("/sub-category")
  .get(
    asyncHandler(
      CategoryController.getWithSubCategory.bind(CategoryController),
    ),
  );

router
  .route("/:id?")
  .get(asyncHandler(CategoryController.get.bind(CategoryController)))
  .post(
    validator(Category),
    asyncHandler(CategoryController.create.bind(CategoryController)),
  )
  .put(
    validator(Category, true),
    asyncHandler(CategoryController.update.bind(CategoryController)),
  )
  .delete(asyncHandler(CategoryController.deleteDoc.bind(CategoryController)));

export default router;
