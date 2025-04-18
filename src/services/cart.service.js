import Cart from "#models/cart";
import { session } from "#middlewares/session";
import BaseService from "#services/base";
import ProductService from "#services/product";

class CartService extends BaseService {
  static Model = Cart;

  static async get() {
    const userId = session.get("userId");

    let cart = await this.Model.findDoc({ userId }, true);
    if (!cart) {
      cart = await this.Model.create({ userId });
      return cart;
    }

    cart = cart.toJSON();

    const { products: productIds } = cart;

    const productIdArr = productIds.map((ele) => {
      return ele.product;
    });

    const products = await ProductService.getWithAggregate([
      {
        $match: { _id: { $in: productIdArr } },
      },
      {
        $project: {
          name: 1,
          image: 1,
          rating: 1,
          reviewCount: 1,
        },
      },
    ]);

    products.forEach((ele, index) => {
      ele.quantity = productIds[index].quantity;
    });

    cart.products = products;
    return cart;
  }

  static async update(id, data) {
    const userId = session.get("userId");

    let cart = await this.Model.findDoc({ userId }, true);

    if (!cart) {
      console.log(userId);
      cart = await this.Model.create({ userId });
    }

    cart.update(data);
    await cart.save();
    return cart;
  }

  static async deleteDoc() {
    const userId = session.get("userId");

    let cart = await this.Model.findDoc({ userId }, true);

    if (!cart) {
      cart = await this.Model.create({ userId });
    }

    cart.update({ products: [] });
    await cart.save();
    return cart;
  }
}

export default CartService;
