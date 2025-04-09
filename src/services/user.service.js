import User from "#models/user";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import OtpService from "#services/otp";
import BaseService from "#services/base";
import { createToken } from "#utils/jwt";

class UserService extends BaseService {
  static Model = User;

  static async adminLogin(loginData) {
    const { email, password } = loginData;

    const user = await this.Model.findDoc({
      email,
    });

    if (user.role !== "admin") {
      throw {
        status: false,
        message: "Invalid Credentials, Admin doesn't exist",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    const verification = await bcrypt.compare(password, user.password);

    if (!verification) {
      throw {
        status: false,
        message: "Incorrect password",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    const payload = {
      ...user.toJSON(),
    };

    delete payload.password;

    const token = createToken(payload);

    const data = {
      user,
      token,
    };

    return data;
  }

  static async login(otpData) {
    const { email, mobile, otp } = otpData;

    const user = await this.Model.findDoc({
      ...(email ? { email } : { mobile }),
    });

    const savedOtp = await OtpService.getDoc(
      {
        ...(email ? { email } : { mobile }),
      },
      true,
    );

    if (!savedOtp) {
      throw {
        status: false,
        message: "Invalid Otp, please get a new otp",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    if (savedOtp.type !== "hybrid") {
      if (
        (email && savedOtp.type === "mobile") ||
        (mobile && savedOtp.type === "email")
      ) {
        throw {
          status: false,
          message: "Invalid Otp",
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }
    }

    if (otp !== savedOtp.otp) {
      throw {
        status: false,
        message: "Incorrect Otp",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    await savedOtp.deleteOne();

    const payload = {
      ...user.toJSON(),
    };

    delete payload.password;

    const token = createToken(payload);

    const data = {
      user,
      token,
    };

    return data;
  }

  static async sendOtp(loginData) {
    const { email, mobile, password } = loginData;

    const user = await this.Model.findDoc({
      ...(email ? { email } : { mobile }),
    });

    const verification = await bcrypt.compare(password, user.password);

    if (!verification) {
      throw {
        status: false,
        message: "Incorrect password",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    let otp = await OtpService.getDoc(
      {
        ...(email ? { email } : { mobile }),
      },
      true,
    );

    if (!otp) {
      otp = await OtpService.create({
        type: email ? "email" : "mobile",
        ...(email ? { email } : { mobile }),
        otp: Math.floor(100000 + Math.random() * 900000),
      });
    }
    return otp;
  }

  static async create(userData) {
    userData.password = await bcrypt.hash(userData.password, 10);
    if (userData.role === "admin") {
      const existing = await this.Model.findDoc(
        {
          role: "admin",
        },
        true,
      );
      if (existing) {
        throw {
          status: false,
          message: "Admin already exists",
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }
    }
    const user = await super.create(userData);
    return user;
  }

  static async update(id, userData) {
    delete userData.password;
    return await super.update(id, userData);
  }
}

export default UserService;
