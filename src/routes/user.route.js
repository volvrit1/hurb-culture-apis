import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import UserController from "#controllers/user";
import authentication from "#middlewares/authentication";
import User from "#models/user";

const router = express.Router();

router
  .route("/admin-login")
  .post(asyncHandler(UserController.adminLogin.bind(UserController)));

router
  .route("/login")
  .post(asyncHandler(UserController.login.bind(UserController)));

router
  .route("/send-otp")
  .post(asyncHandler(UserController.sendOtp.bind(UserController)));

router
  .route("/get-current-user")
  .get(
    authentication,
    asyncHandler(UserController.getCurrentUser.bind(UserController)),
  );

router
  .route("/:id?")
  .get(asyncHandler(UserController.get.bind(UserController)))
  .post(
    validator(User),
    asyncHandler(UserController.create.bind(UserController)),
  )
  .put(
    authentication,
    validator(User, true),
    asyncHandler(UserController.update.bind(UserController)),
  )
  .delete(asyncHandler(UserController.deleteDoc.bind(UserController)));

export default router;
