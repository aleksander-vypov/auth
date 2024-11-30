import fp from 'fastify-plugin'
import knex, {Knex} from 'knex'
import { FastifyPluginAsync }  from 'fastify'

interface KnexConfig {
    client: string;
    connection: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
}

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
    const config: KnexConfig = {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || '',
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER  || '',
            password: process.env.DB_PASSWORD  || '',
            database: process.env.DB_NAME  || '',
        },
    };
    const db = knex(config);

    fastify.decorate('knex', db);
    fastify.addHook('onClose', async (instance) => {
        try {
            await instance.knex.destroy();
            fastify.log.info('database connection closed');
        } catch (err) {
            fastify.log.error(err)
        }

    });
});

export default dbPlugin;
