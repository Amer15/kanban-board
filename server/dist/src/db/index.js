"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const env_1 = __importDefault(require("../env"));
const schema_1 = require("./schema");
const pg_1 = require("pg");
//connection pool
exports.pool = new pg_1.Pool({
    connectionString: env_1.default.DB_URL,
    max: 30,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});
exports.db = (0, node_postgres_1.drizzle)(exports.pool, {
    schema: schema_1.schemas,
    casing: "snake_case",
});
