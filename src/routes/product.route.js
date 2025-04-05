import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import ProductController from "#controllers/product";
import Product from "#models/product";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(ProductController.get.bind(ProductController)))
  .post(
    validator(Product),
    asyncHandler(ProductController.create.bind(ProductController)),
  )
  .put(
    validator(Product, true),
    asyncHandler(ProductController.update.bind(ProductController)),
  )
  .delete(asyncHandler(ProductController.deleteDoc.bind(ProductController)));

export default router;
