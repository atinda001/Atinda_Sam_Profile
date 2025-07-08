import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  description: text("description"),
  url: text("url"),
  role: text("role").notNull(),
  featured: boolean("featured").default(false),
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(),
  title: text("title"),
  body: text("body").notNull(),
  order: integer("order").default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof content.$inferSelect;

export type User = {
  id: number;
  username: string;
  password: string;
};

export type InsertUser = Omit<User, "id">;
