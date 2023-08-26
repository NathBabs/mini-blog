import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  createUserPost,
  retrieveUserPosts,
  retrieveUser,
  retrieveTopUsersWithComments,
} from './user.service';
import { CreateUserPostInput } from './user.schema';

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  createUser(user)
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
}

export async function retrieveUsersController(req: Request, res: Response, next: NextFunction) {
  const email = req.user?.email as string;
  retrieveUser(email)
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
}

export async function createUserPostController(
  req: Request<{}, {}, CreateUserPostInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const { content, title } = req.body;
  const userId = req.user.id;

  createUserPost({ content, title, userId })
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
}

export async function retrieveUserPostsController(req: Request, res: Response, next: NextFunction) {
  const { id: userId } = req.user;

  retrieveUserPosts(userId)
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
}

export async function retrieveTopUsersWithCommentsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  retrieveTopUsersWithComments()
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
}
