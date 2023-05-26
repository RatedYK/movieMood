import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('imdb_rating', 100).alter();
        table.string('runtime', 100).alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('imdb_rating').alter();
        table.string('runtime').alter();
    });
}

