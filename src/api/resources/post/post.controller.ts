import { NextFunction, Request, Response } from 'express';
import { CreateCommentOnPostInput } from './post.schema';
import { commentOnPost } from './post.service';

export const addCommentToPostController = async (
  req: Request<{}, {}, CreateCommentOnPostInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params as any;
  const { content } = req.body;
  const userId = req.user.id;
  commentOnPost({ postId, content, userId })
    .then((dataObj) => {
      res.status(dataObj.statusCode).json({
        status: true,
        data: dataObj.data,
      });
    })
    .catch((err) => next(err));
};
