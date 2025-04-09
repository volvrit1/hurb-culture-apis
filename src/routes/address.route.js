import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import AddressController from "#controllers/address";
import Address from "#models/address";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(AddressController.get.bind(AddressController)))
  .post(
    validator(Address),
    asyncHandler(AddressController.create.bind(AddressController)),
  )
  .put(
    validator(Address, true),
    asyncHandler(AddressController.update.bind(AddressController)),
  )
  .delete(asyncHandler(AddressController.deleteDoc.bind(AddressController)));

export default router;
