"use strict";

class StoreUser {
  get validateAll() {
    return true;
  }

  get rules() {
    const id = this.ctx.params.id;

    let validations = {
      name: "required",
      email: "required|unique:users" + (id ? `,email,id` : ""),
      street: "required",
      number: "required",
      postal_code: "required",
      city_id: "required"
    };

    if (!id) {
      validations = {
        ...validations,
        password: "required|min:6"
      };
    }

    return validations;
  }

  get messages() {
    return {
      "name.required": "O nome é obrigatório",

      "email.required": "O email é obrigatório",
      "email.unique": "O email do grupo precisa ser único",

      "password.required": "A senha é obrigatória",
      "password.min": "A senha precisa ter no mínimo 6 caracteres",

      "street.required": "O nome da rua é obrigatório",

      "number.required": "O número da rua é obrigatório",

      "postal_code.required": "O código postal é obrigatório",

      "city_id.required": "A cidade é obrigatória"
    };
  }
}

module.exports = StoreUser;
