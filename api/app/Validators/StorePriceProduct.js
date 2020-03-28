"use strict";

const Validator = use("Validator");

class StorePriceProduct {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      price: "required",
      url_site: "required"
    };
  }

  get messages() {
    return {
      "url_site.required": "O site do produto é obrigatório",

      "price.required": "O preço do produto é obrigatório"
    };
  }
}

module.exports = StorePriceProduct;
