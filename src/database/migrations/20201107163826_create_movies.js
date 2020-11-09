exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.integer('id').primary();
    table.boolean('adult');
    table.string('backdrop_path');
    table.integer('budget');
    table.string('homepage');
    table.string('imdb_id');
    table.string('original_language');
    table.string('original_title');
    table.text('overview');
    table.decimal('popularity');
    table.string('poster_path');
    table.string('release_date');
    table.integer('revenue');
    table.integer('runtime');
    table.string('status');
    table.string('tagline');
    table.string('title');
    table.boolean('video');
    table.decimal('vote_average');
    table.integer('vote_count');
    table.integer('belongs_to_collection');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
