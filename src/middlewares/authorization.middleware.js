import httpStatus from "http-status";
import { session } from "#middlewares/session";

export default function authorization() {
  return function (req, res, next) {
    try {
      const user = session.get("user");

      if (!user) {
        throw {
          status: false,
          message: "Internal Server Error-Authorization",
          httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
        };
      }

      if (user.role === "admin") return next();

      req.query.userId = user._id;

      return next();
    } catch (err) {
      next(err);
    }
  };
}
