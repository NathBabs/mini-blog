// create a  custom error to take in a message and a status code
type CustomErrorMessage = {
  message: any;
  statusCode: number;
};

export class ExtendedError extends Error {
  constructor(message: CustomErrorMessage) {
    const error = JSON.stringify(message);
    super(error);
  }
}

export function CustomError({ statusCode, message }: CustomErrorMessage) {
  const customMessage: CustomErrorMessage = {
    message,
    statusCode,
  };

  return new ExtendedError(customMessage);
}
