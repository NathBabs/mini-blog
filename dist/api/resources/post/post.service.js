"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPost = void 0;
const AppError_1 = require("../../exceptions/AppError");
const post_repository_1 = require("./post.repository");
const logger_1 = __importDefault(require("../../utils/logger"));
async function commentOnPost({ postId, userId, content }) {
    const createdComment = await (0, post_repository_1.createCommentOnPost)({
        data: {
            content: content,
            post: {
                connect: {
                    id: postId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    if (!createdComment) {
        logger_1.default.error(`::: could not create comment :::`);
        return Promise.reject(new AppError_1.AppError({
            description: 'Comment not created',
            statusCode: AppError_1.StatusCode.BAD_REQUEST,
        }));
    }
    return Promise.resolve({
        statusCode: AppError_1.StatusCode.OK,
        data: createdComment,
    });
}
exports.commentOnPost = commentOnPost;
