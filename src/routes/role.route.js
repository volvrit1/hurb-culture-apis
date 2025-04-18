import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import RoleController from "#controllers/role";
import Role from "#models/role";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(RoleController.get.bind(RoleController)))
  .post(
    validator(Role),
    asyncHandler(RoleController.create.bind(RoleController)),
  )
  .put(
    validator(Role, true),
    asyncHandler(RoleController.update.bind(RoleController)),
  )
  .delete(asyncHandler(RoleController.deleteDoc.bind(RoleController)));

export default router;
