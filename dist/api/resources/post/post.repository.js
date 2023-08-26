"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentOnPost = void 0;
const client_1 = __importDefault(require("../../db/client"));
async function createCommentOnPost(data) {
    return await client_1.default.comment.create(data);
}
exports.createCommentOnPost = createCommentOnPost;
