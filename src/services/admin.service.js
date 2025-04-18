import Admin from "#models/admin";
import bcrypt from "bcryptjs";
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
