"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const AppError_1 = require("./AppError");
const yup_1 = require("yup");
class ErrorHandler {
    isTrustedError(error) {
        if (error instanceof AppError_1.AppError) {
            return error.isOperational;
        }
        return false;
    }
    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error, response);
        }
        else if (error instanceof yup_1.ValidationError && response) {
            const customError = new AppError_1.AppError({
                statusCode: AppError_1.StatusCode.UN_PROCESSABLE_ENTITY,
                description: error.errors.join(', '),
            });
            this.handleTrustedError(customError, response);
        }
        else {
            this.handleCriticalError(error, response);
        }
    }
    handleTrustedError(error, response) {
        response.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });
    }
    handleCriticalError(error, response) {
        if (response) {
            response.status(AppError_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
        const message = error.message || 'Internal server error';
        logger_1.default.error(`::: Application encountered a critical error. [${message}] :::`);
    }
}
exports.errorHandler = new ErrorHandler();
