import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('country', 100).alter();
        table.text('poster_img').alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('country').alter();
        table.string('poster_img').alter();
    });
}

