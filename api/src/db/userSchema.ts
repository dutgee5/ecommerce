import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),

  name: varchar({ length: 255 }),
  address: text(),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
  id: true as never, // true olmasının sebebi id'nin olmaması gerektiğinden yani id'nin otomatik oluşturulması gerektiğinden
  role: true,
});

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
