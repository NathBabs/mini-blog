import { Post, User } from '@prisma/client';
import { generateToken } from '../../common/generateToken';
import {
  createPostByUser,
  createUserEntry,
  findUserByEmail,
  findAllUserPosts,
  findTopUsersWithMostPosts,
} from './user.repository';
import { CreateUserInput } from './user.schema';
import bcrypt from 'bcrypt';
import { AppError, StatusCode } from '../../exceptions/AppError';
import logger from '../../utils/logger';

type BaseResponse<T> = {
  statusCode: number;
  data: Partial<T>;
};

type UserResponse = {
  token: string;
  email: string;
  name: string;
};

// modify the BaseResponse type data property
type CreateUserResponse = BaseResponse<UserResponse>;

type CreatePostResponse = BaseResponse<Post>;

type RetrievePostResponse = BaseResponse<Post[]>;

type RetrieveUserResponse = BaseResponse<User>;

export async function createUser(user: CreateUserInput['body']): Promise<CreateUserResponse> {
  // hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // generate auth token
  const token = await generateToken({
    email: user.email,
    password: hashedPassword,
  });

  // create user in databse
  const createdUser = await createUserEntry({
    data: {
      email: user.email,
      name: user.name,
      password: hashedPassword,
      tokens: {
        set: [token],
      },
    },
  });

  if (!createdUser) {
    logger.error(`::: something went wrong in creating user :::`);
    return Promise.reject(
      new AppError({
        description: 'User not created',
        statusCode: StatusCode.BAD_REQUEST,
      }),
    );
  }

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: {
      token: token,
      email: createdUser?.email,
      name: createdUser?.name,
    },
  });
}

export async function retrieveUser(email: string): Promise<RetrieveUserResponse> {
  // find user in database
  const user: Partial<User | null> = await findUserByEmail(email);

  if (!user) {
    logger.error(`::: user not found :::`);
    return Promise.reject(
      new AppError({
        description: 'User not found',
        statusCode: StatusCode.NOT_FOUND,
      }),
    );
  }

  // remove password and tokens from user object
  delete user?.password;
  delete user?.tokens;

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: user,
  });
}

export async function createUserPost({
  content,
  title,
  userId,
}: {
  content: string;
  title: string;
  userId: string;
}): Promise<CreatePostResponse> {
  // create post in database
  const createdPost = await createPostByUser({
    data: {
      content,
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!createdPost) {
    logger.error(`::: something went wrong in creating post :::`);
    return Promise.reject(
      new AppError({
        description: 'Post not created',
        statusCode: StatusCode.BAD_REQUEST,
      }),
    );
  }

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: createdPost,
  });
}

export async function retrieveUserPosts(userId: string): Promise<RetrievePostResponse> {
  // find all posts in database
  const posts = await findAllUserPosts({
    where: { userId },
  });

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: posts,
  });
}

export async function retrieveTopUsersWithComments(): Promise<any> {
  const topUsers = await findTopUsersWithMostPosts();

  return Promise.resolve({
    statusCode: StatusCode.OK,
    data: topUsers,
  });
}
