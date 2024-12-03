
import Fastify, { FastifyInstance, RawRequestDefaultExpression } from 'fastify'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url';
import dbPlugin from "./plugins/dbPlugin";
import path from 'path';
import 'dotenv/config';

const __dirname = `${path.dirname(fileURLToPath(import.meta.url))}`;
const config = {
    logger: true,
    ignoreTrailingSlash: true,
    caseSensitive: false,
    maxParamLength: 100,
    bodyLimit: 1048576,
    genReqId: (req: RawRequestDefaultExpression): string => `req-${Date.now()}`
}

const fastify: FastifyInstance = Fastify(config)

fastify.register(dbPlugin)

fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.ts|\.cjs)$/i,
    ignorePattern: /.*\.ts/,
    autoHooksPattern: /.*hooks(\.ts|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
});

try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}
