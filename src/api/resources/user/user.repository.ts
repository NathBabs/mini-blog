import { Post, Prisma, User } from '@prisma/client';
import prisma from '../../db/client';

export async function createUserEntry(data: Prisma.UserCreateArgs): Promise<User | null> {
  return await prisma.user.create(data);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createPostByUser(data: Prisma.PostCreateArgs): Promise<Post | null> {
  return await prisma.post.create(data);
}

export async function findAllUserPosts(data: Prisma.PostFindManyArgs): Promise<Post[]> {
  return await prisma.post.findMany(data);
}
