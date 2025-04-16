import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import CartController from "#controllers/cart";
import Cart from "#models/cart";

const router = express.Router();

router
  .route("/user/:id")
  .get(asyncHandler(CartController.getByUserId.bind(CartController)));

router
  .route("/:id?")
  .get(asyncHandler(CartController.get.bind(CartController)))
  .post(
    validator(Cart),
    asyncHandler(CartController.create.bind(CartController)),
  )
  .put(
    validator(Cart, true),
    asyncHandler(CartController.update.bind(CartController)),
  )
  .delete(asyncHandler(CartController.deleteDoc.bind(CartController)));

export default router;
