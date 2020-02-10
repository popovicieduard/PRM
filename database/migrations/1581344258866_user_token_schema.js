'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTokenSchema extends Schema {
  up () {
    this.create('token_user', (table) => {
      table.increments()
      table.integer('token_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('user_id').references('user.id').onDelete('cascade')
      table.foreign('token_id').references('token.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('token_user')
  }
}

module.exports = UserTokenSchema
