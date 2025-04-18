import express from "express";
import asyncHandler from "#utils/asyncHandler";
import AdminController from "#controllers/admin";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(AdminController.get.bind(AdminController)))
  .post(asyncHandler(AdminController.create.bind(AdminController)))
  .put(asyncHandler(AdminController.update.bind(AdminController)))
  .delete(asyncHandler(AdminController.deleteDoc.bind(AdminController)));

export default router;
