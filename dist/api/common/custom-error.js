"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ExtendedError = void 0;
class ExtendedError extends Error {
    constructor(message) {
        const error = JSON.stringify(message);
        super(error);
    }
}
exports.ExtendedError = ExtendedError;
function CustomError({ statusCode, message }) {
    const customMessage = {
        message,
        statusCode,
    };
    return new ExtendedError(customMessage);
}
exports.CustomError = CustomError;
