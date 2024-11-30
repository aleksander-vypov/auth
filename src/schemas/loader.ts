import fp from 'fastify-plugin'
import userInputHeaders from './user-input-headers.json' assert { type: 'json' };

module.exports = fp(function (fastify, _opts, next) {
    fastify.addSchema(userInputHeaders);
    next();
});

