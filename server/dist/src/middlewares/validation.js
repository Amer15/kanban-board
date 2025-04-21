"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTToken = void 0;
exports.validateBody = validateBody;
exports.validateQueryId = validateQueryId;
exports.validateParamsId = validateParamsId;
exports.validateQueryParams = validateQueryParams;
const zod_1 = require("zod");
const zod_2 = require("../utils/zod");
const env_1 = __importDefault(require("../env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../types/express");
/**
 * Middleware to validate the request body against a Zod schema.
 * @param schema - The Zod schema to validate the request body.
 * @returns Middleware function to validate `req.body`.
 */
function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ message: (0, zod_2.zodErrorMessage)(result.error) });
        }
        else {
            next();
        }
    };
}
/**
 * Middleware to validate a query parameter as a number.
 * @param name - The name of the query parameter (default: "id").
 * @returns Middleware function to validate `req.query`.
 */
function validateQueryId(name = "id") {
    return function (req, res, next) {
        const result = zod_1.z.object({ [name]: zod_1.z.coerce.number() }).safeParse(req.query);
        if (!result.success) {
            res.status(400).json({ message: (0, zod_2.zodErrorMessage)(result.error) });
        }
        else {
            next();
        }
    };
}
/**
 * Middleware to validate a route parameter as a number.
 * @param name - The name of the route parameter (default: "id").
 * @returns Middleware function to validate `req.params`.
 */
function validateParamsId(name = "id") {
    return function (req, res, next) {
        const result = zod_1.z
            .object({ [name]: zod_1.z.coerce.number() })
            .safeParse(req.params);
        if (!result.success) {
            res.status(400).json({ message: (0, zod_2.zodErrorMessage)(result.error) });
        }
        else {
            next();
        }
    };
}
const validateJWTToken = (req, res, next) => {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "invalid token",
        });
    }
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET_KEY);
        // populate req object accordingly related to incoming token
        if ("id" in decoded) {
            req.user_id = decoded.id;
        }
        next();
    }
};
exports.validateJWTToken = validateJWTToken;
function validateQueryParams(schema) {
    return function (req, res, next) {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({ message: (0, zod_2.zodErrorMessage)(result.error) });
            return;
        }
        req.query = result.data;
        next();
    };
}
