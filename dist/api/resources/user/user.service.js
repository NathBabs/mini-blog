"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserPosts = exports.createUserPost = exports.retrieveUser = exports.createUser = void 0;
const generateToken_1 = require("../../common/generateToken");
const user_repository_1 = require("./user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../../exceptions/AppError");
const logger_1 = __importDefault(require("../../utils/logger"));
async function createUser(user) {
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    const token = await (0, generateToken_1.generateToken)({
        email: user.email,
        password: hashedPassword,
    });
    const createdUser = await (0, user_repository_1.createUserEntry)({
        data: {
            email: user.email,
            name: user.name,
            password: hashedPassword,
            tokens: {
                set: [token],
            },
        },
    });
    if (!createdUser) {
        logger_1.default.error(`::: something went wrong in creating user :::`);
        return Promise.reject(new AppError_1.AppError({
            description: 'User not created',
            statusCode: AppError_1.StatusCode.BAD_REQUEST,
        }));
    }
    return Promise.resolve({
        statusCode: AppError_1.StatusCode.OK,
        data: {
            token: token,
            email: createdUser?.email,
            name: createdUser?.name,
        },
    });
}
exports.createUser = createUser;
async function retrieveUser(email) {
    const user = await (0, user_repository_1.findUserByEmail)(email);
    if (!user) {
        logger_1.default.error(`::: user not found :::`);
        return Promise.reject(new AppError_1.AppError({
            description: 'User not found',
            statusCode: AppError_1.StatusCode.NOT_FOUND,
        }));
    }
    delete user?.password;
    delete user?.tokens;
    return Promise.resolve({
        statusCode: AppError_1.StatusCode.OK,
        data: user,
    });
}
exports.retrieveUser = retrieveUser;
async function createUserPost({ content, title, userId, }) {
    const createdPost = await (0, user_repository_1.createPostByUser)({
        data: {
            content,
            title,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    if (!createdPost) {
        logger_1.default.error(`::: something went wrong in creating post :::`);
        return Promise.reject(new AppError_1.AppError({
            description: 'Post not created',
            statusCode: AppError_1.StatusCode.BAD_REQUEST,
        }));
    }
    return Promise.resolve({
        statusCode: AppError_1.StatusCode.OK,
        data: createdPost,
    });
}
exports.createUserPost = createUserPost;
async function retrieveUserPosts(userId) {
    const posts = await (0, user_repository_1.findAllUserPosts)({
        where: { userId },
    });
    return Promise.resolve({
        statusCode: AppError_1.StatusCode.OK,
        data: posts,
    });
}
exports.retrieveUserPosts = retrieveUserPosts;
