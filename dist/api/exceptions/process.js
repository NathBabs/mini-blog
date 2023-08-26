"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const ErrorHandler_1 = require("./ErrorHandler");
process.on('uncaughtException', (error) => {
    logger_1.default.error(`::: Uncaught Exception: ${error.message} :::`);
    ErrorHandler_1.errorHandler.handleError(error);
});
