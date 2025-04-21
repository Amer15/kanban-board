"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = __importDefault(require("./src/env"));
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/db/models/**/*.ts",
    dbCredentials: {
        url: env_1.default.DB_URL,
    },
});
