import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import users from '../users/index';
import verifyJWT from '../../middleware/verifyJWT';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  fastify.register(verifyJWT);
  fastify.register(users, { prefix: '/users' });
};

export default routes;
