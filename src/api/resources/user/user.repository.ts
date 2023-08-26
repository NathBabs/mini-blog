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

// run a raw query with prisma
export async function findTopUsersWithMostPosts(): Promise<User[]> {
  return await prisma.$queryRaw`SELECT
    users.id,
    users.name,
    posts.title,
    comments.content
FROM users
    LEFT JOIN posts ON users.id = posts."userId"
    LEFT JOIN (
        SELECT
            comments."postId",
            MAX(created_at) AS latestCreatedAt
        FROM comments
        GROUP BY
           comments."postId"
    ) latest_comments ON posts.id = latest_comments."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    AND comments.created_at = latest_comments.latestCreatedAt
ORDER BY (
        SELECT COUNT(posts.id)
        FROM posts
        WHERE posts."userId"  = users.id
    ) DESC
LIMIT 3;`;
}
