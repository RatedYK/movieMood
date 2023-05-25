import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.string('rated', 5);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('movies', table => {
        table.dropColumn('rated');
    });
}

