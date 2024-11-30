import { Knex } from 'knex';
import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        knex: Knex;
    }
}
