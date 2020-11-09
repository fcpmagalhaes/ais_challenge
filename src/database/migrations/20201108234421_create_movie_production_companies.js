exports.up = function (knex) {
  return knex.schema.createTable('movie_production_companies', (table) => {
    table.increments('id').primary();
    table.integer('id_production_company');
    table.integer('id_movie');

    table.foreign('id_production_company').references('id').inTable('production_companies');
    table.foreign('id_movie').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movie_production_companies');
};
