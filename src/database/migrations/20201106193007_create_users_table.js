exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('login').notNullable();
    table.string('password', 6).notNullable();
    table.unique('login');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
