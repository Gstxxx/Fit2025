import { z } from "zod";

export const weightSchema = z.object({
  value: z.number().positive().max(999.99),
  date: z.string().datetime(),
});

export type WeightInput = z.infer<typeof weightSchema>;
