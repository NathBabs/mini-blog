import { randomUUID } from 'crypto';
import {
  createPostByUser,
  createUserEntry,
  findAllUserPosts,
  findUserByEmail,
} from '../../src/api/resources/user/user.repository';
import {
  createUser,
  createUserPost,
  retrieveUser,
  retrieveUserPosts,
} from '../../src/api/resources/user/user.service';
import logger from '../../src/api/utils/logger';
import { generateToken } from '../../src/api/common/generateToken';
import bcrypt from 'bcrypt';

// mock repository function
jest.mock('../../src/api/resources/user/user.repository', () => ({
  findUserByEmail: jest.fn(),
  createUserEntry: jest.fn(),
  createPostByUser: jest.fn(),
  findAllUserPosts: jest.fn(),
}));

// mock generateToken function
jest.mock('../../src/api/common/generateToken', () => ({
  generateToken: jest.fn(),
}));

// mock bcrypt.hash function
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('retrieveUser', () => {
  it('should return user data when found', async () => {
    // mock repository function
    (findUserByEmail as jest.Mock).mockResolvedValue({
      id: 'fakeUserId',
      email: 'sample@email.com',
      name: 'sample name',
      password: 'fakepassword',
      tokens: [],
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await retrieveUser('sample@email.com');
    logger.info(`::: [${JSON.stringify(result)}] :::`);
    // Assert the result
    expect(result.statusCode).toBe(200); // Assuming OK status code
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBe('fakeUserId');
    expect(result.data?.email).toBe('sample@email.com');
    expect(result.data?.name).toBe('sample name');
    expect(result.data?.password).toBeUndefined();
    expect(result.data?.tokens).toBeUndefined();
  });

  // test for when user is not found
  it('should return error when user not found', async () => {
    // mock repository function
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(retrieveUser('nonexistent@example.com')).rejects.toThrow();
  });
});

describe('createUser', () => {
  it('should create a user and return user data with token', async () => {
    // Mock bcrypt.hash
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

    // Mock generateToken
    (generateToken as jest.Mock).mockResolvedValue('fake_token');

    // Mock createUserEntry
    (createUserEntry as jest.Mock).mockResolvedValue({
      id: 'user_id',
      email: 'user@example.com',
      name: 'John Doe',
    });

    const user = {
      name: 'John Doe',
      email: 'user@example.com',
      password: 'plain_text_password',
    };

    const result = await createUser(user);

    expect(result.statusCode).toBe(200);
    expect(result.data).toBeDefined();
    expect(result.data?.token).toBe('fake_token');
    expect(result.data?.email).toBe('user@example.com');
    expect(result.data?.name).toBe('John Doe');
  });

  it('should return an error when user is not created', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
    (generateToken as jest.Mock).mockResolvedValue('fake_token');
    (createUserEntry as jest.Mock).mockResolvedValue(null);

    const user = {
      name: 'John Doe',
      email: 'user@example.com',
      password: 'plain_text_password',
    };

    await expect(createUser(user)).rejects.toThrow();
  });
});

describe('createPost', () => {
  it('should create a post and return post data', async () => {
    // Mock createPostByUser
    (createPostByUser as jest.Mock).mockResolvedValue({
      id: randomUUID(),
      title: 'Sample Post',
      content: 'Sample Content',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      published: true,
      userId: 'fakeUserId',
    });

    const post = {
      title: 'Sample Post',
      content: 'Sample Content',
      userId: 'fakeUserId',
    };

    const result = await createUserPost(post);

    expect(result).toBeDefined();
    expect(result?.statusCode).toBe(200);
    expect(result?.data.title).toBe('Sample Post');
    expect(result?.data.content).toBe('Sample Content');
    expect(result?.data.id).toBeDefined();
    expect(result?.data.userId).toBe(post.userId);
    expect(result?.data.deletedAt).toBeNull();
    expect(result?.data.createdAt).toBeDefined();
    expect(result?.data.updatedAt).toBeDefined();
  });

  it('should return an error when post is not created', async () => {
    (createPostByUser as jest.Mock).mockResolvedValue(null);

    const post = {
      title: 'Sample Post',
      content: 'Sample Content',
      userId: 'fakeUserId',
    };

    await expect(createUserPost(post)).rejects.toThrow();
  });
});

describe('retrieveUserPosts', () => {
  it('should return user posts when found', async () => {
    // Mock findAllUserPosts
    (findAllUserPosts as jest.Mock).mockResolvedValue([
      {
        id: randomUUID(),
        title: 'Sample Post',
        content: 'Sample Content',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        userId: 'fakeUserId',
      },
    ]);

    const result = await retrieveUserPosts('fakeUserId');

    expect(result).toBeDefined();
    expect(result?.statusCode).toBe(200);
    expect(result?.data).toHaveLength(1);
    // to fix typescript "object is posible undefined" error
    if (result?.data[0]) {
      expect(result?.data[0].title).toBe('Sample Post');
      expect(result?.data[0].content).toBe('Sample Content');
      expect(result?.data[0].id).toBeDefined();
      expect(result?.data[0].userId).toBe('fakeUserId');
      expect(result?.data[0].deletedAt).toBeNull();
      expect(result?.data[0].createdAt).toBeDefined();
      expect(result?.data[0].updatedAt).toBeDefined();
    }
  });

  it('should return an empty array of posts when no post is found', async () => {
    (findAllUserPosts as jest.Mock).mockResolvedValue([]);

    const result = await retrieveUserPosts('fakeUserId');

    expect(result).toBeDefined();
    expect(result?.statusCode).toBe(200);
    expect(result?.data).toHaveLength(0);
  });
});
