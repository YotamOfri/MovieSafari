import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import newUser from '../users/newUser';
import books from '../books';
import anime from '../anime';
import manga from '../manga';
//import comics from '../comics';
import lightnovels from '../light-novels';
import movies from '../movies';
import meta from '../meta';
import news from '../news';
import auth from '../auth';
import Utils from '../../utils';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  // register news routes
  await fastify.register(newUser, { prefix: '/users/newuser' });
  await fastify.register(books, { prefix: '/books' });
  await fastify.register(anime, { prefix: '/anime' });
  await fastify.register(manga, { prefix: '/manga' });
  //await fastify.register(comics, { prefix: '/comics' });
  await fastify.register(lightnovels, { prefix: '/light-novels' });
  await fastify.register(movies, { prefix: '/movies' });
  await fastify.register(meta, { prefix: '/meta' });
  await fastify.register(news, { prefix: '/news' });
  await fastify.register(auth, { prefix: '/auth' });
  await fastify.register(Utils, { prefix: '/utils' });
};

export default routes;
