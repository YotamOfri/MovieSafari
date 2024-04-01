import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import { createUser } from '../../utils/userHelpers';
import { generateTokensAndSetCookie } from '../../utils/authHelpers';
import { IUser } from '../../models/user';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, email, password, giveCookie } = request.body as any;
    if (!username || !email || !password)
      return reply.status(400).send({ message: 'All Fields are required' });

    try {
      const user: IUser = await createUser({ username, email, password });
      if (user && giveCookie) {
        generateTokensAndSetCookie(reply, user);
        return reply.status(202).send(user);
      }
      return reply.status(202).send({ message: `User ${user.username} Created!` });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return reply.status(409).send({ message: error.message });
      }
    }
  });
};
export default routes;
