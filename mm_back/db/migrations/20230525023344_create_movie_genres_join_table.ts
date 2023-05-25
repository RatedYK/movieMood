import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('movies_genres', table => {
        table.integer('movie_id').unsigned().references('movies.id').onDelete('CASCADE');
        table.integer('genre_id').unsigned().references('genres.id').onDelete('CASCADE');
        table.primary(['movie_id', 'genre_id']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('movies_genres');
}

