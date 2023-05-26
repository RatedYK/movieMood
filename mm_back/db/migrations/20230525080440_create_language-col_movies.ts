import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('language', 300);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.dropColumn('language');
    });
}

