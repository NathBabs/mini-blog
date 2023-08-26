"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUserPosts = exports.createPostByUser = exports.findUserByEmail = exports.createUserEntry = void 0;
const client_1 = __importDefault(require("../../db/client"));
async function createUserEntry(data) {
    return await client_1.default.user.create(data);
}
exports.createUserEntry = createUserEntry;
async function findUserByEmail(email) {
    return await client_1.default.user.findUnique({
        where: {
            email,
        },
    });
}
exports.findUserByEmail = findUserByEmail;
async function createPostByUser(data) {
    return await client_1.default.post.create(data);
}
exports.createPostByUser = createPostByUser;
async function findAllUserPosts(data) {
    return await client_1.default.post.findMany(data);
}
exports.findAllUserPosts = findAllUserPosts;
