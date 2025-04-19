import Admin from "#models/admin";
import bcrypt, { compare } from "bcryptjs";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";
import mongoose from "mongoose";
import BaseService from "#services/base";
import RoleService from "#services/role";

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

    let admin = await this.Model.aggregate([
      {
        $match: { email },
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
          password: 1,
          adminId: "$_id",
        },
      },
    ]);

    if (!admin.length) {
      throw {
        status: false,
        message: "Admin doesn\'t exist",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    admin = admin[0];

    const verification = await compare(password, admin.password);

    if (!verification) {
      throw {
        status: false,
        message: "Incorrect password",
      };
    }

    delete admin.password;

    const payload = admin;

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
    const adminRole = await RoleService.getDoc({ name: "Admin" }, true);

    const existingAdmin = await this.Model.findDoc(
      { roleId: adminRole._id },
      true,
    );

    if (existingAdmin && data.roleId === adminRole._id) {
      throw {
        status: false,
        message: "Admin already exists",
        httpStatus: httpStatus.FORBIDDEN,
      };
    }

    data.password = await bcrypt.hash(data.password, 10);
    return await super.create(data);
  }

  static async update(id, data) {
    delete data.password;
    return await super.update(id, data);
  }
}

export default AdminService;
