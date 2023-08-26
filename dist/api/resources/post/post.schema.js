"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentOnPostSchema = void 0;
const yup_1 = require("yup");
exports.createCommentOnPostSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        content: (0, yup_1.string)()
            .required('A comment is required')
            .min(3, 'Comments must be at least 3 characters')
            .max(100, 'Comments must not exceed 300 characters'),
    }),
});
