import { Comment } from '@prisma/client';
import { AppError, StatusCode } from '../../exceptions/AppError';
import { createCommentOnPost } from './post.repository';
import logger from '../../utils/logger';

type BaseResponse<T> = {
  statusCode: number;
  data: Partial<T>;
};

type CreateCommentResponse = BaseResponse<Comment>;

export async function commentOnPost({ postId, userId, content }): Promise<CreateCommentResponse> {
  const createdComment = await createCommentOnPost({
    data: {
      content: content,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!createdComment) {
    logger.error(`::: could not create comment :::`);
    return Promise.reject(
      new AppError({
        description: 'Comment not created',
        statusCode: StatusCode.BAD_REQUEST,
      }),
    );
  }

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: createdComment,
  });
}
