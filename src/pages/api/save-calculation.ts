import { getDb } from "../../db/client";
import { calculations, calculationRows } from "../../db/schema";
import { env } from "cloudflare:workers";
import { z } from 'astro/zod';

const CalculationSchema = z.object({
  startCapital: z.coerce.number(),
  monthlySaving: z.coerce.number(),
  years: z.coerce.number(),
  annualRate: z.coerce.number(),
  interval: z.enum(["monthly", "quarterly", "yearly"]),
  finalBalance: z.coerce.number(),
  totalInvested: z.coerce.number(),
  totalInterest: z.coerce.number(),

  rows: z.array(
    z.object({
      period: z.number(),
      balance: z.number(),
      totalInvested: z.number(),
      totalInterest: z.number(),
      periodInterest: z.number(),

      overrideRate: z.coerce.number().nullable(),
    })
  ),
});

export async function POST({ request }: { request: Request }) {
    const userId = "user-1233"; // TODO: Replace with actual user ID from auth
  const db = getDb(env.DB);

  const resultparse = CalculationSchema.safeParse(await request.json());

if (!resultparse.success) {
  return Response.json(
    { error: z.treeifyError(resultparse.error) },
    { status: 400 }
  );
}

const body = resultparse.data;

  const result = await db.insert(calculations).values({
    userId,
    startCapital: body.startCapital,
    monthlySaving: body.monthlySaving,
    years: body.years,
    annualRate: body.annualRate,
    interval: body.interval,
    finalBalance: body.finalBalance,
    totalInvested: body.totalInvested,
    totalInterest: body.totalInterest,
    createdAt: Date.now(),
  }).returning({ id: calculations.id });

  const id = result[0].id;

  await db.insert(calculationRows).values(
    body.rows.map((r: any) => ({
      calculationId: id,
      period: r.period,
      balance: r.balance,
      totalInvested: r.totalInvested,
      totalInterest: r.totalInterest,
      periodInterest: r.periodInterest,
      overrideRate: r.overrideRate || null,
    }))
  );

  return Response.json({ success: true, id });
}