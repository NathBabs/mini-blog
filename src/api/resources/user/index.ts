import { Router } from 'express';
import {
  createUserController,
  retrieveUsersController,
  createUserPostController,
  retrieveUserPostsController,
  retrieveTopUsersWithCommentsController,
} from './user.controller';
import validate from '../../middlewares/validateRequest';
import { createUserSchema, createUserPostSchema } from './user.schema';
import { auth } from '../../middlewares/auth';

type RouteOptions = {
  router: Router;
  path?: string;
};

const user = ({ router, path = '/users' }: RouteOptions) => {
  router.post(`${path}`, validate(createUserSchema), createUserController);
  router.get(`${path}`, auth, retrieveUsersController);

  // posts
  router.post(`${path}/:id/posts`, auth, validate(createUserPostSchema), createUserPostController);
  router.get(`${path}/:id/posts`, auth, retrieveUserPostsController);

  router.get(`${path}/top-users`, retrieveTopUsersWithCommentsController);
};

export default user;
