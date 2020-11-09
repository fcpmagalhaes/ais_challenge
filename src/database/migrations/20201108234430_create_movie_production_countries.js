exports.up = function (knex) {
  return knex.schema.createTable('movie_production_countries', (table) => {
    table.increments('id').primary();
    table.integer('id_production_country');
    table.integer('id_movie');

    table.foreign('id_production_country').references('id').inTable('production_countries');
    table.foreign('id_movie').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movie_production_countries');
};
