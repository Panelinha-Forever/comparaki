"use strict";

/** .type {typeof import('.adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("/login", "AuthController.login");
  Route.post("/register", "AuthController.register");
  Route.get("/refresh", "AuthController.refresh");
  Route.post("/logout", "AuthController.logout");
  Route.get("/user", "AuthController.user");
}).prefix("api/v1/auth");
