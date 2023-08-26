import { object, string, number, InferType } from 'yup';

export const createCommentOnPostSchema = object({
  body: object({
    content: string()
      .required('A comment is required')
      .min(3, 'Comments must be at least 3 characters')
      .max(100, 'Comments must not exceed 300 characters'),
  }),
});
export interface CreateCommentOnPostInput extends InferType<typeof createCommentOnPostSchema> {}
