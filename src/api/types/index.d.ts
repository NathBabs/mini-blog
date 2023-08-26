import { User as user } from '@prisma/client';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: user;
      token?: string;
    }
  }
}
