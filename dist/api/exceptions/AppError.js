"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["UN_AUTHORISED"] = 401] = "UN_AUTHORISED";
    StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["UN_AVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UN_AVAILABLE_FOR_LEGAL_REASONS";
    StatusCode[StatusCode["UN_AVAILABLE"] = 503] = "UN_AVAILABLE";
    StatusCode[StatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    StatusCode[StatusCode["RE_DIRECT"] = 302] = "RE_DIRECT";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCode[StatusCode["UN_PROCESSABLE_ENTITY"] = 422] = "UN_PROCESSABLE_ENTITY";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
class AppError extends Error {
    name;
    statusCode;
    isOperational = true;
    constructor(args) {
        super(args.description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name || 'Error';
        this.statusCode = args.statusCode;
        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
