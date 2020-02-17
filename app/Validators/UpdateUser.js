'use strict'

class UpdateUser {
  get rules () {
    return {
      // validation rules
      old_password: 'required|string',
      password: 'required|confirmed|string',
      password_confirmation: 'required|string',
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'old_password.required': 'You must provide the old password.',
      'old_password.string': 'Old password must be string.',
      'password.required': 'You must provide a password',
      'password.confirmed': 'Password and repeat password must be equal',
      'password_confirmation.required': 'Repeat Password is required',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UpdateUser
