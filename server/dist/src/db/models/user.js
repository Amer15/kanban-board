"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTableRelations = exports.userTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const timestamps_1 = require("../../utils/timestamps");
const task_1 = require("./task");
exports.userTable = (0, pg_core_1.pgTable)("users", Object.assign({ id: (0, pg_core_1.serial)("id").primaryKey(), full_name: (0, pg_core_1.varchar)("full_name").notNull(), email: (0, pg_core_1.varchar)("email").unique().notNull(), password: (0, pg_core_1.varchar)("password").notNull() }, timestamps_1.timestamps));
exports.userTableRelations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    tasks: many(task_1.taskTable),
}));
