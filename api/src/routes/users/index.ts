import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import users from './users';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(users, { prefix: '' });
};

export default routes;
