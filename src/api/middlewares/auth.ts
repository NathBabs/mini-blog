import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import prisma from '../db/client';
import { AppError, StatusCode } from '../exceptions/AppError';

type decodedPayload = {
  id: string;
  iat: number;
  exp: number;
};

type decodedExpPayload = {
  header: {
    alg: string;
    typ: string;
  };
  payload: decodedPayload;
  signature: string;
};

export async function auth(req: Request, res: Response, next: NextFunction) {
  // retreive token from the request header
  const headers: any = req.headers;
  const [type, token] = headers?.authorization?.split(' ') ?? [];

  // trim the token
  token?.trim();

  try {
    if (!token) {
      return Promise.reject({
        message: 'Please authenticate',
        statusCode: StatusCode.FORBIDDEN,
      });
    }
    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET as string) as decodedPayload;

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        tokens: {
          has: token,
        },
      },
    });

    if (!user) {
      return Promise.reject(
        new AppError({
          description: 'User not found',
          statusCode: StatusCode.UN_AUTHORISED,
        }),
      );
    }

    //since this method has already found the user, there's no need for the route
    // handler to start finding the user again.

    req.user = user;
    req.token = token;

    next();
  } catch (error: any) {
    logger.error(error);
    if (error.message == 'jwt expired') {
      // @ts-ignore
      const decodedExp = jwt.decode(token, {
        complete: true,
      }) as decodedExpPayload;

      const id = decodedExp?.payload.id;

      const user = await prisma.user.findFirst({
        where: { id: id },
      });

      if (!user) {
        return Promise.reject(
          new AppError({
            description: 'Forbidden',
            statusCode: StatusCode.FORBIDDEN,
          }),
        );
      }

      const filteredTokens = user.tokens.filter((singleToken) => {
        return singleToken != token;
      });

      await prisma.user.update({
        where: { id: id },
        data: { tokens: filteredTokens },
      });

      return Promise.reject(
        new AppError({
          description: 'Token expired, please login again',
          statusCode: StatusCode.UN_AUTHORISED,
        }),
      );
    }

    return Promise.reject(
      new AppError({
        description: 'Forbidden',
        statusCode: StatusCode.FORBIDDEN,
        isOperational: false,
      }),
    );
  }
}
