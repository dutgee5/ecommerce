import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("product", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable).omit({
  id: true as never, // true olmasının sebebi id'nin olmaması gerektiğinden yani id'nin otomatik oluşturulması gerektiğinden
});

export const updateProductSchema = createInsertSchema(productsTable)
  .omit({ id: true as never })
  .partial();
