"use strict";

const Validator = use("Validator");

class StoreProduct {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
      description: "required",
      desired_price: "required",
      max_date: "required"
    };
  }

  get messages() {
    return {
      "name.required": "O nome é obrigatório",

      "description.required": "A descrição é obrigatória",

      "desired_price.required": "O preço desejado é obrigatório",

      "max_date.required": "A data máxima para compra é obrigatória"
    };
  }
}

module.exports = StoreProduct;
