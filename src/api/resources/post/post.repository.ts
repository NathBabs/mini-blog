import { Prisma, Comment } from '@prisma/client';
import prisma from '../../db/client';

export async function createCommentOnPost(data: Prisma.CommentCreateArgs): Promise<Comment | null> {
  return await prisma.comment.create(data);
}
