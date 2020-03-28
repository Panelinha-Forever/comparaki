"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PriceProduct extends Model {
  static boot() {
    super.boot();
  }

  static fillable() {
    return ["url_site", "price", "product_id"];
  }
}

module.exports = PriceProduct;
