"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken({ email, password }) {
    const token = jsonwebtoken_1.default.sign({
        email,
        password,
    }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
}
exports.generateToken = generateToken;
