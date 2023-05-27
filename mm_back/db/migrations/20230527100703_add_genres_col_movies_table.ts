import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.string('genres', 500);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.dropColumn('genres');
    });
}

