'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      username: 'required|string|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed|string',
      password_confirmation: 'required|string',
      role: 'required|string'
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'username.required': 'You must provide a username.',
      'username.unique': 'This username is already taken.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'password.confirmed': 'Password and repeat password must be equal',
      'password_confirmation.required': 'Repeat Password is required',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = StoreUser
