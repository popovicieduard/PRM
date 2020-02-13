'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required',
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = StoreUser
