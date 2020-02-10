'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Partner extends Model {
    static boot () {
        super.boot()
    
        /**
         * A hook to bash the user password before saving
         * it to the database.
         *
         * Look at `app/Models/Hooks/User.js` file to
         * check the hashPassword method
         */
        this.addHook('beforeSave', 'User.hashPassword')
      }
    
      static get hidden () {
        return ['password']
      }
    
      /**
       * A relationship on tokens is required for auth to
       * work. Since features like `refreshTokens` or
       * `rememberToken` will be saved inside the
       * tokens table.
       *
       * @method tokens
       *
       * @return {Object}
       */
      tokens () {
        return this.hasMany('App/Models/Token')
      }
}

module.exports = Partner
