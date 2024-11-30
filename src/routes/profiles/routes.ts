'use strict'
import {FastifyInstance, FastifyRegisterOptions, FastifyRequest} from "fastify";

interface ProfileRouteOptions {
    myCustomOption?: string; // Добавьте опции, которые вы ожидаете
}

interface Params {
    id: number,
    status: 'string'
}

 async function profileRoutes(fastify: FastifyInstance, _opts: FastifyRegisterOptions<ProfileRouteOptions>) {
     fastify.route({
         method: 'GET',
         url: '/',
         handler: async function listProfiles(request, reply) {
             const data = await fastify.knex('profiles').select('*');
             return { data, };
         },
     })
     fastify.route({
         method: 'POST',
         url: '/',
         handler: async function createProfile(request, reply) {
             await fastify.knex('profiles').insert(request.body)
             reply.code(201)
         },
     });
     fastify.route({
         method: 'GET',
         url: '/:id',
         handler: async function readProfile(request: FastifyRequest<{Params: Params}>, reply) {
             const {id} = request.params
             return {}; // [4]
         },
     });
     fastify.route({
         method: 'PUT',
         url: '/:id',
         handler: async function updateProfile(request: FastifyRequest<{Params: Params}>, reply) {
             reply.code(204); // [5]
         },
     });
     fastify.route({
         method: 'DELETE',
         url: '/:id',
         handler: async function deleteProfile(request: FastifyRequest<{Params: Params}>, reply) {
             reply.code(204); // [6]
         },
     });
     fastify.route({
         method: 'POST',
         url: '/:id/:status',
         handler: async function changeStatus(
             request: FastifyRequest<{Params: Params}>,
             reply
         ) {
             reply.code(204); // [7]
         },
     });
 }

export default profileRoutes
