"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentToPostController = void 0;
const post_service_1 = require("./post.service");
const addCommentToPostController = async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    (0, post_service_1.commentOnPost)({ postId, content, userId })
        .then((dataObj) => {
        res.status(dataObj.statusCode).json({
            status: true,
            data: dataObj.data,
        });
    })
        .catch((err) => next(err));
};
exports.addCommentToPostController = addCommentToPostController;
