"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateProductSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();
      table.string("name");
      table.string("description");
      table.string("desired_price");
      table.date("max_date");
      table
        .integer("user_id")
        .unsigned()
        .index();
      table
        .foreign("user_id")
        .references("id")
        .on("users")
        .onDelete("cascade");

      table.boolean("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = CreateProductSchema;
