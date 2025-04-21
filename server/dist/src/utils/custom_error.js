"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
/**
 * Custom error class for handling errors with an associated HTTP status code.
 * Extends the built-in `Error` class.
 */
class CustomError extends Error {
    /**
     * Creates a new `CustomError` instance. Extends the built-in `Error` class.
     * @param message - The error message.
     * @param statusCode - The HTTP status code to associate with the error.
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
