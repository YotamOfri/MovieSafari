import jwt from 'jsonwebtoken';
import { User } from '../models';
import { FastifyReply } from 'fastify';
import {  IUser } from '../models/user';

// Adjust the response parameter type to Fastify's Reply interface
function generateTokensAndSetCookie(res: FastifyReply, user: IUser): boolean {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '3h' },
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' },
  );

  // Adjusted for Fastify's setCookie method
  res.setCookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    path: '/',
  });
  res.setCookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 999 * 60 * 60, // 3 hours in seconds
    path: '/',
  });

  return true;
}

async function getValidUsername(username: string, email?: string): Promise<string> {
  let name: string = username;
  if (email && !/^[a-zA-Z]+$/.test(name)) {
    const atIndex: number = email.indexOf('@');
    name = email.substring(0, atIndex);
  }
  let count: number = 1;
  let duplicate = await User.findOne({ username: name }).lean().exec();
  while (duplicate) {
    name = `${name}${count}`;
    duplicate = await User.findOne({ username: name }).lean().exec();
    count++;
  }
  return name;
}

export { generateTokensAndSetCookie, getValidUsername };
