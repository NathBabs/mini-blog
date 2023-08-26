"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./api/resources/user"));
const ErrorHandler_1 = require("./api/exceptions/ErrorHandler");
const logger_1 = __importDefault(require("./api/utils/logger"));
const post_1 = __importDefault(require("./api/resources/post"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
app.use((0, morgan_1.default)('common', {
    stream: {
        write: (message) => {
            const statusCode = message.match(/(?<=\s)\d{3}(?=\s)/g);
            if (statusCode && parseInt(statusCode[0]) >= 400) {
                logger_1.default.error(message);
            }
            else {
                logger_1.default.info(message);
            }
        },
    },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, user_1.default)({ router });
(0, post_1.default)({ router });
app.use(router);
app.use((err, req, res, next) => {
    ErrorHandler_1.errorHandler.handleError(err, res);
});
exports.default = app;
