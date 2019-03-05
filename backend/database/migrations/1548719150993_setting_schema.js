'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingsSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments()
      table.string('name',150).notNullable();
      table.string('name_bd', 150).notNullable();
      table.string('user_bd', 40).notNullable();
      table.string('password_bd', 40).notNullable();
      table.date('date_backup');
      table.time('time_backup');
      table.boolean('status',0);
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingsSchema
