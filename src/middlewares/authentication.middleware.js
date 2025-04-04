import { verifyToken } from "#utils/jwt";
import { session } from "#middlewares/session";

export default function authentication(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw {
        status: false,
        message: "Please login",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    const payload = verifyToken(token);
    session.set("user", payload);
    return next();
  } catch (err) {
    next(err);
  }
}
