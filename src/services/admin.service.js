import Admin from "#models/admin";
import bcrypt, { compare } from "bcryptjs";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";
import mongoose from "mongoose";
import BaseService from "#services/base";

class AdminService extends BaseService {
  static Model = Admin;

  static async get(id, filters) {
    if (id) {
      return await this.Model.findDocById(id);
    }

    const initialStage = [
      {
        $lookup: {
          from: "roles",
          as: "roleData",
          localField: "roleId",
          foreignField: "_id",
        },
      },
    ];

    const extraStage = [
      {
        $project: {
          name: 1,
          email: 1,
          role: { $arrayElemAt: ["$roleData.name", 0] },
          createdAt: 1,
        },
      },
    ];

    return await this.Model.findAll(filters, initialStage, extraStage);
  }

  static async login(adminData) {
    const { email, password } = adminData;

    const admin = await this.Model.findDoc({
      email,
    });

    const verification = await compare(password, admin.password);

    if (!verification) {
      throw {
        status: false,
        message: "Incorrect password",
      };
    }

    const payload = {
      ...admin.toJSON(),
      adminId: admin._id,
    };

    delete payload.password;

    const token = createToken(payload);

    const data = {
      admin,
      token,
    };

    return data;
  }

  static async getCurrentAdmin(adminId) {
    const admin = await this.Model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(adminId) },
      },
      {
        $lookup: {
          from: "roles",
          as: "roleData",
          localField: "roleId",
          foreignField: "_id",
        },
      },
      {
        $project: {
          name: 1,
          permissions: { $arrayElemAt: ["$roleData.permissions", 0] },
          email: 1,
          roleName: { $arrayElemAt: ["$roleData.name", 0] },
        },
      },
    ]);

    if (!admin.length) {
      throw {
        status: false,
        message: "Please login again",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    return admin[0];
  }

  static async create(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return await super.create(data);
  }

  static async update(id, data) {
    delete data.password;
    return await super.update(data);
  }
}

export default AdminService;
