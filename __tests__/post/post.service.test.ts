import { createCommentOnPost } from '../../src/api/resources/post/post.repository';
import { commentOnPost } from '../../src/api/resources/post/post.service';

jest.mock('../../src/api/resources/post/post.repository', () => ({
  createCommentOnPost: jest.fn(),
}));

describe('commentOnPost', () => {
  it('should return comment data when created', async () => {
    // mock repository function
    (createCommentOnPost as jest.Mock).mockResolvedValue({
      id: 'fakeCommentId',
      content: 'fake comment content',
      postId: 'fakePostId',
      userId: 'fakeUserId',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const result = await commentOnPost({
      postId: 'fakePostId',
      userId: 'fakeUserId',
      content: 'fake comment content',
    });

    // Assert the result
    expect(result.statusCode).toBe(200); // Assuming OK status code
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBe('fakeCommentId');
    expect(result.data?.content).toBe('fake comment content');
    expect(result.data?.userId).toBe('fakeUserId');
    expect(result.data?.postId).toBe('fakePostId');
    expect(result?.data.deletedAt).toBeNull();
    expect(result?.data.createdAt).toBeDefined();
    expect(result?.data.updatedAt).toBeDefined();
  });

  it('should throw error when comment is not created', async () => {
    // mock createCommentOnPost resolved value
    (createCommentOnPost as jest.Mock).mockResolvedValue(null);

    await expect(
      commentOnPost({
        postId: 'fakePostId',
        userId: 'fakeUserId',
        content: 'fake comment content',
      }),
    ).rejects.toThrow();
  });
});
