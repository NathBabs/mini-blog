"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_schema_1 = require("./user.schema");
const auth_1 = require("../../middlewares/auth");
const user = ({ router, path = '/users' }) => {
    router.post(`${path}`, (0, validateRequest_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserController);
    router.get(`${path}`, auth_1.auth, user_controller_1.retrieveUsersController);
    router.post(`${path}/:id/posts`, auth_1.auth, (0, validateRequest_1.default)(user_schema_1.createUserPostSchema), user_controller_1.createUserPostController);
    router.get(`${path}/:id/posts`, auth_1.auth, user_controller_1.retrieveUserPostsController);
};
exports.default = user;
