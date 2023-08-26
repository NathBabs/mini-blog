import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error: any) {
      logger.error(`::: [${JSON.stringify(error)}] :::`);
      return next(error);
    }
  };

export default validate;
