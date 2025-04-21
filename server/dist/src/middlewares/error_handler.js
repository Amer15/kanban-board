"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const custom_error_1 = require("../utils/custom_error");
const zod_1 = require("zod");
const zod_2 = require("../utils/zod");
function errorHandler(error, _, res, next) {
    console.error(error);
    if (error instanceof custom_error_1.CustomError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({ message: (0, zod_2.zodErrorMessage)(error) });
        return;
    }
    if (error instanceof SyntaxError) {
        res.status(400).json({ message: error.message });
        return;
    }
    if (error instanceof Error) {
        if (error.message === "jwt malformed") {
            res
                .status(401)
                .json({ message: `access denied, invalid token provided` });
            return;
        }
        if (error.message === "jwt expired") {
            res.status(401).json({
                message: `access denied, your token expired please sign in again`,
            });
            return;
        }
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: "something went wrong" });
    next(error);
}
