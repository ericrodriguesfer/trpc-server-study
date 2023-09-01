import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const usersRelations = relations(users, ({ one }) => ({
  phone: one(phone, {
    fields: [users.id],
    references: [phone.userId],
  }),
}));

export const phone = pgTable("phone", {
  id: serial("id").primaryKey(),
  operator: varchar("operator"),
  ddd: varchar("ddd"),
  number: varchar("number"),
  userId: integer("user_id").references(() => users.id),
});
