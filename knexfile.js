module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user: 'postgres',
      password: 'docker',
      database: 'ais_postgres',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
  },

  test: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user: 'postgres',
      password: 'docker',
      database: 'ais_postgres_test',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
  },
};
