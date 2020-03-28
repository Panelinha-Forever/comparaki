"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    let defaultUser = await User.query()
      .where("email", "=", "ti@comparaki.info")
      .first();

    if (!defaultUser) {
      defaultUser = new User();
      defaultUser.name = "default";
      defaultUser.email = "ti@comparaki.info";
      defaultUser.password = "a1s2d3f4";

      await defaultUser.save();
    }
  }
}

module.exports = UserSeeder;
