exports.up = function (knex) {
  return knex.schema.createTable('translations', (table) => {
    table.increments('id').primary();
    table.string('iso_3166_1');
    table.string('iso_639_1');
    table.string('name');
    table.string('english_name');
    table.string('homepage');
    table.text('overview');
    table.integer('runtime');
    table.string('tagline');
    table.string('title');
    table.integer('id_movie');

    table.foreign('id_movie').references('id').inTable('movies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('translations');
};
