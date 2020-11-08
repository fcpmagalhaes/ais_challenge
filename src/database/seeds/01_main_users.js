exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      { login: 'admin', password: '123456' },
      { login: 'otherUser', password: '123456' },
    ]));
};
