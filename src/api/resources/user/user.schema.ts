import { object, string, number, InferType } from 'yup';

export const createUserSchema = object({
  body: object({
    email: string().email('Must be a valid email address').required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters'),
    name: string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  }),
});
export interface CreateUserInput extends InferType<typeof createUserSchema> {}

export const userLoginSchema = object({
  body: object({
    email: string().email('Must be a valid email address').required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters'),
  }),
});

export interface LoginUserInput extends InferType<typeof userLoginSchema> {}

export const createUserPostSchema = object({
  body: object({
    title: string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must not exceed 100 characters'),
    content: string()
      .required('Body is required')
      .min(3, 'Content of post must be at least 3 characters')
      .max(1000, 'Content of post not exceed 1000 characters'),
  }),
});
export interface CreateUserPostInput extends InferType<typeof createUserPostSchema> {}
