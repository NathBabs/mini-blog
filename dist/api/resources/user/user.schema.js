"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPostSchema = exports.userLoginSchema = exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().email('Must be a valid email address').required('Email is required'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters'),
        name: (0, yup_1.string)().required('Name is required').min(3, 'Name must be at least 3 characters'),
    }),
});
exports.userLoginSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().email('Must be a valid email address').required('Email is required'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters'),
    }),
});
exports.createUserPostSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(50, 'Title must not exceed 100 characters'),
        content: (0, yup_1.string)()
            .required('Body is required')
            .min(3, 'Content of post must be at least 3 characters')
            .max(1000, 'Content of post not exceed 1000 characters'),
    }),
});
