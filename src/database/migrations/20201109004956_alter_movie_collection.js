exports.up = function (knex) {
  return knex.schema.alterTable('movies', (table) => {
    table.foreign('belongs_to_collection').references('id').inTable('collections');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
