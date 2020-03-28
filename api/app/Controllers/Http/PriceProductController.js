"use strict";

const PriceProduct = use("App/Models/PriceProduct");

class PriceProductController {
  async index({ request, response, transform }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;

    return transform.paginate(
      await PriceProduct.query().paginate(page, perPage),
      "PriceProductTransformer"
    );
  }

  async show({ params, transform }) {
    const priceProduct = await PriceProduct.findOrFail(params.id);
    return transform.item(priceProduct, "PriceProductTransformer");
  }

  async store({ auth, request, transform }) {
    const priceProductData = request.only(PriceProduct.fillable());

    const priceProduct = await PriceProduct.create(priceProductData);

    return transform.item(priceProduct, "PriceProductTransformer");
  }

  async update({ request, params, transform }) {
    let priceProduct = await PriceProduct.findOrFail(params.id);
    const priceProductData = request.only(PriceProduct.fillable());

    priceProduct.merge(priceProductData);

    await priceProduct.save();

    return transform.item(priceProduct, "PriceProductTransformer");
  }

  async destroy({ params }) {
    const priceProduct = await PriceProduct.findOrFail(params.id);

    await priceProduct.delete();
  }
}

module.exports = PriceProductController;
