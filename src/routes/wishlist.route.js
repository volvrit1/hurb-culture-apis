import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import WishlistController from "#controllers/wishlist";
import Wishlist from "#models/wishlist";

const router = express.Router();

router
  .route("/user/:id")
  .get(asyncHandler(WishlistController.getByUserId.bind(WishlistController)));

router
  .route("/:id?")
  .get(asyncHandler(WishlistController.get.bind(WishlistController)))
  .post(
    validator(Wishlist),
    asyncHandler(WishlistController.create.bind(WishlistController)),
  )
  .put(
    validator(Wishlist, true),
    asyncHandler(WishlistController.update.bind(WishlistController)),
  )
  .delete(asyncHandler(WishlistController.deleteDoc.bind(WishlistController)));

export default router;
