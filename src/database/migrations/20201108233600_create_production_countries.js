exports.up = function (knex) {
  return knex.schema.createTable('production_countries', (table) => {
    table.integer('id').primary();
    table.string('logo_path');
    table.string('name');
    table.string('origin_country');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('production_countries');
};
