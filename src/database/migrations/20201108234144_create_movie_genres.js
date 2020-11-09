exports.up = function (knex) {
  return knex.schema.createTable('movie_genres', (table) => {
    table.increments('id').primary();
    table.integer('id_genre');
    table.integer('id_movie');

    table.foreign('id_genre').references('id').inTable('genres');
    table.foreign('id_movie').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movie_genres');
};
