"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const EnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.coerce.number().default(5000),
    DB_URL: zod_1.z.string(),
    JWT_SECRET_KEY: zod_1.z.string(),
    REFRESH_TOKEN_SECRET: zod_1.z.string(),
    TOKEN_LIFE: zod_1.z.string(),
    REFRESH_TOKEN_LIFE: zod_1.z.string(),
});
let env;
try {
    env = EnvSchema.parse(process.env);
}
catch (e) {
    const error = e;
    console.error("Invalid env file");
    console.error(error.flatten().fieldErrors);
    process.exit(1);
}
exports.default = env;
