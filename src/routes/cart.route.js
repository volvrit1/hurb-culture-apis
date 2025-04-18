import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import CartController from "#controllers/cart";
import Cart from "#models/cart";
import authentication from "#middlewares/authentication";

const router = express.Router();

router
  .route("/:id?")
  .get(authentication, asyncHandler(CartController.get.bind(CartController)))
  .post(asyncHandler(CartController.create.bind(CartController)))
  .put(authentication, asyncHandler(CartController.update.bind(CartController)))
  .delete(
    authentication,
    asyncHandler(CartController.deleteDoc.bind(CartController)),
  );

export default router;
