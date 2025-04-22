import Brand from "#models/brand";
import { compare } from "bcryptjs";
import { createToken } from "#utils/jwt";
import httpStatus from "http-status";
import BaseService from "#services/base";

class BrandService extends BaseService {
  static Model = Brand;

  static async login(brandData) {
    const { email, password } = brandData;

    let brand = await this.Model.aggregate([
      {
        $match: { email },
      },
    ]);

    if (!brand.length) {
      throw {
        status: false,
        message: "Brand doesn\'t exist",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    brand = brand[0];

    const verification = await compare(password, brand.password);

    if (!verification) {
      throw {
        status: false,
        message: "Incorrect password",
      };
    }

    delete brand.password;

    const payload = brand;

    delete payload.password;

    const token = createToken(payload);

    const data = {
      admin: brand,
      token,
    };

    return data;
  }
}

export default BrandService;
