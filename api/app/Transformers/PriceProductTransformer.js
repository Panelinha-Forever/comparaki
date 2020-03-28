"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

class PriceProductTransformer extends BumblebeeTransformer {
  async transform(model) {
    return {
      id: model.id,
      url_site: model.url_site,
      price: model.price
    };
  }
}

module.exports = PriceProductTransformer;
