import type { Knex } from "knex";
require('dotenv').config({path: './.env'});

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: './dist/db/migrations'
    }
  }

};

module.exports = config;
