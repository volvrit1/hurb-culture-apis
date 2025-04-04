import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import NotificationController from "#controllers/notification";
import Notification from "#models/notification";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(NotificationController.get.bind(NotificationController)))
  .post(
    validator(Notification),
    asyncHandler(NotificationController.create.bind(NotificationController)),
  )
  .put(
    validator(Notification, true),
    asyncHandler(NotificationController.update.bind(NotificationController)),
  )
  .delete(
    asyncHandler(NotificationController.deleteDoc.bind(NotificationController)),
  );

export default router;
