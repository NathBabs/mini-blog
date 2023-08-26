import { Router } from 'express';
import { addCommentToPostController } from './post.controller';
import validate from '../../middlewares/validateRequest';
import { createCommentOnPostSchema } from './post.schema';
import { auth } from '../../middlewares/auth';

type RouteOptions = {
  router: Router;
  path?: string;
};

const post = ({ router, path = '/posts' }: RouteOptions) => {
  router.post(`${path}/:postId/comments`, auth, validate(createCommentOnPostSchema), addCommentToPostController);
};

export default post;
