import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import BlogCategoryController from "#controllers/blogCategory";
import BlogCategory from "#models/blogCategory";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BlogCategoryController.get.bind(BlogCategoryController)))
  .post(
    validator(BlogCategory),
    asyncHandler(BlogCategoryController.create.bind(BlogCategoryController)),
  )
  .put(
    validator(BlogCategory, true),
    asyncHandler(BlogCategoryController.update.bind(BlogCategoryController)),
  )
  .delete(
    asyncHandler(BlogCategoryController.deleteDoc.bind(BlogCategoryController)),
  );

export default router;
