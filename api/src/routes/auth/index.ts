import { FastifyInstance, RegisterOptions } from 'fastify';
import auth from './auth';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(auth, { prefix: '' });
};

export default routes;
