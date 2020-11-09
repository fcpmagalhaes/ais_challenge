exports.up = function (knex) {
  return knex.schema.createTable('genres', (table) => {
    table.integer('id').primary();
    table.string('name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('genres');
};
