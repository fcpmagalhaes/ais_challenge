exports.up = function (knex) {
  return knex.schema.createTable('movie_spoken_languages', (table) => {
    table.increments('id').primary();
    table.integer('id_spoken_language');
    table.integer('id_movie');

    table.foreign('id_spoken_language').references('id').inTable('spoken_languages');
    table.foreign('id_movie').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movie_spoken_languages');
};
