import { pgTable, varchar, serial, text, integer } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { relations } from "drizzle-orm";
import { timestamps } from "@/utils/timestamps";
import { taskStatus } from "@/types/enums";

export const taskTable = pgTable("user_tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  user_id: integer("user_id").references(() => userTable.id),
  task_status: varchar("task_status", { enum: taskStatus }).default("todo"),
  ...timestamps,
});

export const taskRelations = relations(taskTable, ({ one }) => ({
  user: one(userTable, {
    fields: [taskTable.user_id],
    references: [userTable.id],
  }),
}));
