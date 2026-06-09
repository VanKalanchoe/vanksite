import { getDb } from "../../db/client";
import { calculationRows, calculations } from "../../db/schema";
import { env } from "cloudflare:workers";
import { eq, inArray } from "drizzle-orm";

export async function GET() {
  const db = getDb(env.DB);

  const userId = "user-123"; // temporary hardcoded user

  // 1. Only this user's calculations
  const userCalculations = await db
    .select()
    .from(calculations)
    .where(eq(calculations.userId, userId));

  // 2. If none, return early
  if (userCalculations.length === 0) {
    return Response.json([]);
  }

  // 3. Get all related rows only for this user's calculations
  const calcIds = userCalculations.map((c) => c.id);

  const rows = await db
    .select()
    .from(calculationRows)
    .where(inArray(calculationRows.calculationId, calcIds));

  // 4. Group rows by calculationId
  const rowsByCalcId = new Map<number, typeof calculationRows.$inferSelect[]>();

  for (const row of rows) {
    const arr = rowsByCalcId.get(row.calculationId) || [];
    arr.push(row);
    rowsByCalcId.set(row.calculationId, arr);
  }

  // 5. Merge
  const result = userCalculations.map((calc) => ({
    ...calc,
    rows: rowsByCalcId.get(calc.id) || [],
  }));

  return Response.json(result);
}