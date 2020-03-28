"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

class UserTransformer extends BumblebeeTransformer {
  async transform(model) {
    return {
      id: model.id,
      name: model.name,
      email: model.email
    };
  }
}

module.exports = UserTransformer;
