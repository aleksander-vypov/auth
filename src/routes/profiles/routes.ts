'use strict'
import {FastifyInstance, FastifyRegisterOptions, FastifyRequest} from "fastify";

interface ProfileRouteOptions {
    myCustomOption?: string;
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
             const data = await fastify.prisma.profiles.findMany({include: {user: true}});
             return { data };
         },
     })
     fastify.route({
         method: 'POST',
         url: '/',
         handler: async function createProfile(request, reply) {

         },
     });

     fastify.route({
         method: 'GET',
         url: '/:id',
         handler: async function readProfile(request: FastifyRequest<{Params: Params}>, reply) {
             const {id} = request.params
             return {};
         },
     });
     fastify.route({
         method: 'PUT',
         url: '/:id',
         handler: async function updateProfile(request: FastifyRequest<{Params: Params}>, reply) {
             reply.code(204);
         },
     });
     fastify.route({
         method: 'DELETE',
         url: '/:id',
         handler: async function deleteProfile(request: FastifyRequest<{Params: Params}>, reply) {
             reply.code(204);
         },
     });
     fastify.route({
         method: 'POST',
         url: '/:id/:status',
         handler: async function changeStatus(
             request: FastifyRequest<{Params: Params}>,
             reply
         ) {
             reply.code(204);
         },
     });
 }

export default profileRoutes
