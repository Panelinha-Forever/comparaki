"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreatePriceProductSchema extends Schema {
  up() {
    this.create("price_products", table => {
      table.increments();

      table
        .integer("product_id")
        .unsigned()
        .index();
      table
        .foreign("product_id")
        .references("id")
        .on("products")
        .onDelete("cascade");

      table.string("url_site");
      table.string("price");

      table.timestamps();
    });
  }

  down() {
    this.drop("price_products");
  }
}

module.exports = CreatePriceProductSchema;
