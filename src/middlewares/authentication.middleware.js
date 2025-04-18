import { verifyToken } from "#utils/jwt";
import httpStatus from "http-status";
import { session } from "#middlewares/session";

export default function authentication(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);

    if (!token) {
      throw {
        status: false,
        message: "Please login",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    const payload = verifyToken(token);
    console.log(payload);
    session.set("user", payload);
    session.set("userId", payload.userId);
    return next();
  } catch (err) {
    next(err);
  }
}
