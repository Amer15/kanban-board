import { pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "@/utils/timestamps";
import { taskTable } from "./task";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name").notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  ...timestamps,
});

export const userTableRelations = relations(userTable, ({ many }) => ({
  tasks: many(taskTable),
}));
