"use strict";

const User = use("App/Models/User");

class AuthController {
  async login({ auth, request, response }) {
    const { email, password } = request.all();

    return await auth.withRefreshToken().attempt(email, password);
  }

  async register({ auth, request, response }) {
    const userData = request.only(User.fillable());

    const user = await User.create(userData);

    const { email, password } = user;

    return await auth.withRefreshToken().attempt(email, password);
  }

  async refresh({ auth, request }) {
    let refreshToken = request.header("Authorization");
    if (refreshToken) {
      refreshToken = refreshToken.replace("Bearer ", "");
    }
    return await auth.generateForRefreshToken(refreshToken, true);
  }

  async user({ auth, params, transform }) {
    return transform.item(auth.user, "UserTransformer");
  }

  async logout({ auth, response }) {
    try {
      return await auth.logout();
    } catch (error) {}
    response.send({});
  }
}

module.exports = AuthController;
