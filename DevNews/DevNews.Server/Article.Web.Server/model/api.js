"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exception = exports.faild = exports.success = void 0;
const success = (title, message, result) => ({
    title: title,
    code: 200,
    result: result,
    message: message,
    status: true
});
exports.success = success;
const faild = (code, title, message) => ({
    code: code,
    message: message,
    result: {},
    status: false,
    title: title
});
exports.faild = faild;
const exception = (message) => ({
    code: 500,
    message: message,
    title: 'Exception',
    result: {},
    status: false
});
exports.exception = exception;
//# sourceMappingURL=api.js.map