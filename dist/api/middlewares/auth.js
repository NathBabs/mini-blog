"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const client_1 = __importDefault(require("../db/client"));
const AppError_1 = require("../exceptions/AppError");
async function auth(req, res, next) {
    const headers = req.headers;
    const [type, token] = headers?.authorization?.split(' ') ?? [];
    token?.trim();
    try {
        if (!token) {
            return Promise.reject({
                message: 'Please authenticate',
                statusCode: AppError_1.StatusCode.FORBIDDEN,
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token.trim(), process.env.JWT_SECRET);
        const user = await client_1.default.user.findFirst({
            where: {
                id: decoded.id,
                tokens: {
                    has: token,
                },
            },
        });
        if (!user) {
            return Promise.reject(new AppError_1.AppError({
                description: 'User not found',
                statusCode: AppError_1.StatusCode.UN_AUTHORISED,
            }));
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        if (error.message == 'jwt expired') {
            const decodedExp = jsonwebtoken_1.default.decode(token, {
                complete: true,
            });
            const id = decodedExp?.payload.id;
            const user = await client_1.default.user.findFirst({
                where: { id: id },
            });
            if (!user) {
                return Promise.reject(new AppError_1.AppError({
                    description: 'Forbidden',
                    statusCode: AppError_1.StatusCode.FORBIDDEN,
                }));
            }
            const filteredTokens = user.tokens.filter((singleToken) => {
                return singleToken != token;
            });
            await client_1.default.user.update({
                where: { id: id },
                data: { tokens: filteredTokens },
            });
            return Promise.reject(new AppError_1.AppError({
                description: 'Token expired, please login again',
                statusCode: AppError_1.StatusCode.UN_AUTHORISED,
            }));
        }
        return Promise.reject(new AppError_1.AppError({
            description: 'Forbidden',
            statusCode: AppError_1.StatusCode.FORBIDDEN,
            isOperational: false,
        }));
    }
}
exports.auth = auth;
