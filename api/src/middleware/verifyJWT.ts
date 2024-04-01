import {
  FastifyRequest as FR,
  FastifyReply,
  FastifyInstance,
  FastifyPluginAsync,
} from 'fastify';
import fp from 'fastify-plugin';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserInfo {
  username: string;
  _id: string;
}

// Extend FastifyRequest interface
interface FastifyRequest extends FR {
  user?: string;
  Id?: string; // Changed from 'id' to 'userId'
}

const verifyJWT: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorateRequest('user', null);
  fastify.decorateRequest('Id', null);
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const access_token = request.cookies.access_token;
    const check = request.headers['tokencheck'] === 'true';
    console.log('Access Request');
    if (!access_token && check) return reply.status(200).send({ failed: true });
    if (!access_token) return reply.status(401).send({ message: 'Unauthorized' });
    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
      if (err && check) return reply.status(200).send({ failed: true });
      if (err) return reply.status(403).send({ message: 'Forbidden' });
      console.log('Access Granted');
      request.user = (decoded as JwtPayload & { UserInfo: UserInfo }).UserInfo.username;
      request.id = (decoded as JwtPayload & { UserInfo: UserInfo }).UserInfo._id;
    });
  });
};

export default fp(verifyJWT);
