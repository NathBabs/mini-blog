"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_schema_1 = require("./post.schema");
const auth_1 = require("../../middlewares/auth");
const post = ({ router, path = '/posts' }) => {
    router.post(`${path}/:postId/comments`, auth_1.auth, (0, validateRequest_1.default)(post_schema_1.createCommentOnPostSchema), post_controller_1.addCommentToPostController);
};
exports.default = post;
