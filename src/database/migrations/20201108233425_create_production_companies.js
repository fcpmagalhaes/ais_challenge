exports.up = function (knex) {
  return knex.schema.createTable('production_companies', (table) => {
    table.integer('id').primary();
    table.string('iso_3166_1');
    table.string('name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('production_companies');
};
