import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const calculations = sqliteTable("calculations", {
  id: integer("id").primaryKey({ autoIncrement: true }),

   currentUserId: text("user_id").notNull(),

  startCapital: integer("start_capital").notNull(),
  monthlySaving: integer("monthly_saving").notNull(),
  years: integer("years").notNull(),
  annualRate: real("annual_rate").notNull(),
  interval: text("interval").notNull(), // monthly / quarterly / yearly

  finalBalance: integer("final_balance").notNull(),
  totalInvested: integer("total_invested").notNull(),
  totalInterest: integer("total_interest").notNull(),

  createdAt: integer("created_at").notNull(), // timestamp
});

export const calculationRows = sqliteTable("calculation_rows", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  calculationId: integer("calculation_id")
    .notNull()
    .references(() => calculations.id),

  period: integer("period").notNull(),

  balance: integer("balance").notNull(),
  totalInvested: integer("total_invested").notNull(),
  totalInterest: integer("total_interest").notNull(),
  periodInterest: integer("period_interest").notNull(),

  overrideRate: real("override_rate"),
});