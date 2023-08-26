"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserPostsController = exports.createUserPostController = exports.retrieveUsersController = exports.createUserController = void 0;
const user_service_1 = require("./user.service");
async function createUserController(req, res, next) {
    const user = req.body;
    (0, user_service_1.createUser)(user)
        .then((dataObj) => {
        res.status(dataObj.statusCode).json({
            status: true,
            data: dataObj.data,
        });
    })
        .catch((err) => next(err));
}
exports.createUserController = createUserController;
async function retrieveUsersController(req, res, next) {
    const email = req.user?.email;
    (0, user_service_1.retrieveUser)(email)
        .then((dataObj) => {
        res.status(dataObj.statusCode).json({
            status: true,
            data: dataObj.data,
        });
    })
        .catch((err) => next(err));
}
exports.retrieveUsersController = retrieveUsersController;
async function createUserPostController(req, res, next) {
    const { content, title } = req.body;
    const userId = req.user.id;
    (0, user_service_1.createUserPost)({ content, title, userId })
        .then((dataObj) => {
        res.status(dataObj.statusCode).json({
            status: true,
            data: dataObj.data,
        });
    })
        .catch((err) => next(err));
}
exports.createUserPostController = createUserPostController;
async function retrieveUserPostsController(req, res, next) {
    const { id: userId } = req.user;
    (0, user_service_1.retrieveUserPosts)(userId)
        .then((dataObj) => {
        res.status(dataObj.statusCode).json({
            status: true,
            data: dataObj.data,
        });
    })
        .catch((err) => next(err));
}
exports.retrieveUserPostsController = retrieveUserPostsController;
