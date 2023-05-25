import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('movies', table => {
        table.increments('id').primary();
        table.string('title', 100).notNullable();
        table.string('plot', 100);
        table.string('year', 4);
        table.string('runtime', 10);
        table.string('actors', 250);
        table.string('director', 100);
        table.string('poster_img');
        table.string('country', 30);
        table.string('imdb_rating', 5);
        table.string('imdb_id', 10);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('movies');
}

