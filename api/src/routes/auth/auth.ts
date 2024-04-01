import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import bcrypt from 'bcrypt';
import { User } from '../../models';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateTokensAndSetCookie, getValidUsername } from '../../utils/authHelpers';
import { createUser } from '../../utils/userHelpers';
import { IUser } from '../../models/user';

const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any;
    if (!email || !password)
      return reply.status(400).send({ message: 'All fields are required' });
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return reply.status(401).send({ message: 'Unauthorized' });
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return reply.status(401).send({ message: 'Unauthorized' });
    const accessToken = generateTokensAndSetCookie(reply, foundUser);
    return reply.status(202).send({ accessToken });
  });

  fastify.post('/google', async (request: FastifyRequest, reply: FastifyReply) => {
    const { access_token } = request.body as any;
    if (access_token) {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (!response.ok)
        return reply.status(response.status).send({ error: 'Google Api Error' });
      const userData = await response.json();

      let foundUser = await User.findOne({ email: userData.email }).exec();
      if (!foundUser) {
        try {
          let username = await getValidUsername(userData.name);
          await createUser({
            username,
            email: userData.email,
            password: process.env.SOCIAL_PASSWORD!,
          });
          foundUser = await User.findOne({ email: userData.email });
        } catch (error: unknown) {
          if (error instanceof Error) {
            return reply.status(400).send({ message: error.message });
          }
        }
      }
      const accessToken = generateTokensAndSetCookie(reply, foundUser as IUser);
      reply.status(202).send({ accessToken });
    }
  });

  fastify.post('/facebook', async (request: FastifyRequest, reply: FastifyReply) => {
    const { data } = request.body as any;
    if (!data || !data?.name || !data?.id || !data?.email)
      return reply.status(400).send({ message: 'Facebook user data is required' });
    let foundUser = await User.findOne({ email: data.email }).exec();
    if (!foundUser) {
      let username = await getValidUsername(data.name, data.email);
      const hashedPassword = await bcrypt.hash(data.id, 10);
      const userObject = {
        username,
        email: data.email,
        password: hashedPassword,
      };
      foundUser = await User.create(userObject);
      if (!foundUser)
        return reply.status(400).send({ message: 'Invalid user data received' });
    }
    const accessToken = generateTokensAndSetCookie(reply, foundUser);
    return reply.status(202).send({ accessToken });
  });

  fastify.post('/refresh', async (request: FastifyRequest, reply: FastifyReply) => {
    const cookies = request.cookies;
    if (!cookies.jwt) return reply.status(401).send({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err, decoded) => {
      if (err) return reply.status(403).send({ message: 'Forbidden' });
      const foundUser = await User.findOne({
        username: (decoded as JwtPayload).username,
      });
      if (!foundUser) return reply.status(401).send({ message: 'Unauthorized' });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '1h' },
      );
      reply.send({ accessToken });
    });
  });

  fastify.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    const cookies = request.cookies;
    console.log(cookies);

    if (!cookies.jwt) return reply.status(204).send();
    reply.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    reply.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    reply.status(202).send({ message: 'Cookie cleared' });
  });
};

export default routes;
