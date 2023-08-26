import express, { NextFunction, Request, Response, Router } from 'express';
import morgan from 'morgan';
import user from './api/resources/user';
import { errorHandler } from './api/exceptions/ErrorHandler';
import logger from './api/utils/logger';
import post from './api/resources/post';

const app = express();
const router = Router();

app.use(
  morgan('common', {
    stream: {
      write: (message) => {
        const statusCode = message.match(/(?<=\s)\d{3}(?=\s)/g);
        if (statusCode && parseInt(statusCode[0]) >= 400) {
          logger.error(message);
        } else {
          logger.info(message);
        }
      },
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// attach all routes here
/**
 * user routes
 */
user({ router });

/**
 * post routes
 */
post({ router });

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default app;
