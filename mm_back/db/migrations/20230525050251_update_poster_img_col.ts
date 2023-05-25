import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('poster_img', 1000).alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('poster_img').alter();
    });
}

