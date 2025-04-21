"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.getAllUsers = void 0;
const validation_1 = require("../../utils/validation");
const validators_1 = require("./validators");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../db");
const user_1 = require("../../db/models/user");
const drizzle_orm_1 = require("drizzle-orm");
const custom_error_1 = require("../../utils/custom_error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../env"));
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.db.query.userTable.findMany({
        columns: {
            password: false,
        },
    });
    res.status(200).json({
        message: "successfully fetched users",
        users,
    });
});
exports.getAllUsers = getAllUsers;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, validation_1.validateSchema)(validators_1.registerUserSchema, req.body);
    const { password } = payload, otherData = __rest(payload, ["password"]);
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const userExist = yield db_1.db.query.userTable.findFirst({
        where: (0, drizzle_orm_1.eq)(user_1.userTable.email, otherData.email),
    });
    if (userExist) {
        throw new custom_error_1.CustomError("account already exist with this email", 400);
    }
    yield db_1.db.insert(user_1.userTable).values(Object.assign({ password: hashedPassword }, otherData));
    res.status(201).json({
        message: "registration successfull, please signin",
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, validation_1.validateSchema)(validators_1.loginUserSchema, req.body);
    const { email, password } = payload;
    const user = yield db_1.db.query.userTable.findFirst({
        where: (0, drizzle_orm_1.eq)(user_1.userTable.email, email),
    });
    if (!user) {
        throw new custom_error_1.CustomError("no account found, please register", 400);
    }
    const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new custom_error_1.CustomError("invalid credentials", 400);
    }
    const tokenPayload = {
        id: user.id,
        email: user.email,
    };
    const access_token = jsonwebtoken_1.default.sign(tokenPayload, env_1.default.JWT_SECRET_KEY, {
        expiresIn: env_1.default.TOKEN_LIFE,
    });
    const refresh_token = jsonwebtoken_1.default.sign(tokenPayload, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.default.REFRESH_TOKEN_LIFE,
    });
    const { password: userPass } = user, otherUserData = __rest(user, ["password"]);
    res.status(201).json({
        message: "login successfull",
        access_token,
        refresh_token,
        user: otherUserData,
    });
});
exports.login = login;
