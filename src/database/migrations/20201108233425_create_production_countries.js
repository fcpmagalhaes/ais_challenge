exports.up = function (knex) {
  return knex.schema.createTable('production_countries', (table) => {
    table.increments('id').primary();
    table.string('iso_3166_1');
    table.string('name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('production_countries');
};
