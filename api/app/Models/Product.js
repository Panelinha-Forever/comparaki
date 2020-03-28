"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  static boot() {
    super.boot();
  }

  static fillable() {
    return ["name", "description", "desired_price", "max_date"];
  }

  price() {
    return this.belongsTo("App/Models/PriceProduct", "product_id", "id");
  }

  user() {
    return this.hasOne("App/Models/User", "user_id", "id");
  }
}

module.exports = Product;
