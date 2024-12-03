import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync }  from 'fastify'

const dbPlugin: FastifyPluginAsync = fp(async (fastify) => {
    const db = new PrismaClient();
    fastify.decorate('prisma', db);
    fastify.addHook('onClose', async (instance) => {
        try {
            await instance.prisma.$disconnect();
            fastify.log.info('database connection closed');
        } catch (err) {
            fastify.log.error(err)
        }
    });
});

export default dbPlugin;
