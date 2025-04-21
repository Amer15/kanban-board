"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRelations = exports.taskTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
const timestamps_1 = require("../../utils/timestamps");
const enums_1 = require("../../types/enums");
exports.taskTable = (0, pg_core_1.pgTable)("user_tasks", Object.assign({ id: (0, pg_core_1.serial)("id").primaryKey(), title: (0, pg_core_1.varchar)("title").notNull(), description: (0, pg_core_1.text)("description"), user_id: (0, pg_core_1.integer)("user_id").references(() => user_1.userTable.id), task_status: (0, pg_core_1.varchar)("task_status", { enum: enums_1.taskStatus }).default("todo") }, timestamps_1.timestamps));
exports.taskRelations = (0, drizzle_orm_1.relations)(exports.taskTable, ({ one }) => ({
    user: one(user_1.userTable, {
        fields: [exports.taskTable.user_id],
        references: [user_1.userTable.id],
    }),
}));
