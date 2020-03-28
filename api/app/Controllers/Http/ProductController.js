"use strict";

const Product = use("App/Models/Product");

class ProductController {
  async index({ request, response, transform }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;

    return transform.paginate(
      await Product.query().paginate(page, perPage),
      "ProductTransformer"
    );
  }

  async show({ params, transform }) {
    const product = await Product.findOrFail(params.id);
    return transform.item(product, "ProductTransformer");
  }

  async store({ auth, request, transform }) {
    const productData = request.only(Product.fillable());

    const product = await Product.create({
      ...productData,
      user_id: auth.user.id
    });

    return transform.item(product, "ProductTransformer");
  }

  async update({ request, params, transform }) {
    let product = await Product.findOrFail(params.id);
    const productData = request.only(Product.fillable());

    product.merge(productData);

    await product.save();

    return transform.item(product, "ProductTransformer");
  }

  async destroy({ params }) {
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }
}

module.exports = ProductController;
