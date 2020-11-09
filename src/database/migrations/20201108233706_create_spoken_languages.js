exports.up = function (knex) {
  return knex.schema.createTable('spoken_languages', (table) => {
    table.increments('id').primary();
    table.string('iso_639_1');
    table.string('name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('spoken_languages');
};
