import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from 'fastify';
import bycrpt from 'bcrypt';
import { User } from '../../models';
import { usersWatchingRequest } from '../../models/requests';
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await User.find().select('-password');
    if (!users) return reply.status(400).send({ message: 'No Users Found' });
    else reply.send({ users: users });
  });

  // @desc Update user
  // @route Patch /users
  // @access Private
  fastify.patch('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id, username, email, password, oldpassword } = request.body as any;
      const userId = id || request.id;
      const user = await User.findById(userId).exec();

      if (!user) return reply.status(404).send({ message: 'User not found' });

      if (username && username !== user.username) {
        const usernameTaken = await User.findOne({ username }, '_id').lean().exec();
        if (usernameTaken && usernameTaken._id.toString() !== userId)
          return reply.status(409).send({ message: 'Username Taken' });
        user.username = username;
      }
      if (email && email !== user.email) {
        const emailTaken = await User.findOne({ username }, '_id').lean().exec();
        if (emailTaken && emailTaken._id.toString() !== userId)
          return reply.status(409).send({ message: 'Email Taken' });
        user.email = email;
      }

      if (password) {
        const match = await bycrpt.compare(oldpassword, user.password);
        if (!match)
          return reply.status(401).send({
            message:
              'Invalid password. Please enter the correct password associated with your account.',
          });

        if (password === oldpassword)
          return reply.status(409).send({
            message: 'Please choose a password distinct from the previous one.',
          });

        user.password = await bycrpt.hash(password, 10);
      }

      const updatedUser = await user.save();
      reply.status(200).send({ message: `${updatedUser.username} updated` });
    } catch (error) {
      reply.status(500).send({ message: 'An error occurred while updating the user.' });
    }
  });
  // @desc Add to [watching, seen, bookmarks]
  // @route post [watching, seen, bookmarks]
  // @access Private
  const handleUpdateInformation = (field: string) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const { itemId, type } = request.body as usersWatchingRequest;
      if (!itemId || !request.id)
        return reply.status(400).send({ message: 'itemId and userId required' });
      const updateField = type === 'anime' ? `anime.${field}` : `modern.${field}`;
      await User.findByIdAndUpdate(request.id, {
        $addToSet: { [updateField]: itemId.toString() },
      });
      reply.status(202).send({ message: `Added to ${field}` });
    };
  };

  fastify.post('/watching', handleUpdateInformation('watching'));
  fastify.post('/seen', handleUpdateInformation('seen'));
  fastify.post('/bookmarks', handleUpdateInformation('bookmarks'));

  // @desc delete user
  // @route DELETE /users
  // @access Private
  fastify.delete('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.body as any;
    if (!id) return reply.status(400).send({ message: 'id is required' });
    const user = await User.findById(id).exec();
    if (!user) return reply.status(400).send({ message: 'user not found' });
    const result = await user.deleteOne();
    reply.send({
      message: `The username : ${user.username} with the ID : ${user._id} was deleted`,
    });
  });

  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = (request.params as any).id;
    if (!id) return reply.status(400).send({ message: 'id is required' });
    const user = await User.findById(id).select('-password').exec();
    if (!user) return reply.status(400).send({ message: 'user not found' });
    reply.status(202).send(user);
  });
  fastify.get('/find', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request.id;
    if (!id) return reply.status(400).send({ message: 'id is required' });
    const user = await User.findById(id).select('-password').exec();
    if (!user) return reply.status(400).send({ message: 'user not found' });
    reply.status(202).send(user);
  });
};

export default routes;
