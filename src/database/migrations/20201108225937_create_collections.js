exports.up = function (knex) {
  return knex.schema.createTable('collections', (table) => {
    table.integer('id').primary();
    table.string('name');
    table.string('poster_path');
    table.string('backdrop_path');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('collections');
};
