"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

class ProductTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["user", "price"];
  }

  async transform(model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      desired_value: model.desired_value,
      max_date: model.max_date
    };
  }

  includeUser(model) {
    return this.item(model.getRelated("user"), "UserTransformer");
  }

  includePrice(model) {
    return this.item(model.getRelated("price"), "ProductPriceTransformer");
  }
}

module.exports = ProductTransformer;
