'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Hash = use("Hash");

class VerifyPassword {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    // call next to advance the request
    let { old_password } = request.all();

    const user = await auth.getUser()

    if (!(await Hash.verify(old_password, user.password))) {
      return response.status(400).json({
        message: "Old password is not correct"
      });
    }

    await next();
  }
}

module.exports = VerifyPassword
