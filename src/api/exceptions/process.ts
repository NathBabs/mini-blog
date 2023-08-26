import logger from '../utils/logger';
import { errorHandler } from './ErrorHandler';

process.on('uncaughtException', (error: Error) => {
  logger.error(`::: Uncaught Exception: ${error.message} :::`);

  errorHandler.handleError(error);
});
