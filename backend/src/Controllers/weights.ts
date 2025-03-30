import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import prisma from "../prisma";
import { weightSchema } from "../schemas";
import { authMiddleware } from "../middleware/auth";

const route = new Hono()
  .basePath("/weights")
  .use("*", authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").userId;
    const weights = await prisma.weight.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return c.json(
      weights.map((w) => ({
        ...w,
        value: w.value / 100, // Convertendo de volta para kg
      }))
    );
  })
  .post("/", zValidator("json", weightSchema), async (c) => {
    const userId = c.get("user").userId;
    const { value, date } = await c.req.json();
    const newWeight = await prisma.weight.create({
      data: {
        value: Math.round(value * 100), // Convertendo para centavos
        date: new Date(date),
        userId,
      },
    });
    return c.json({
      ...newWeight,
      value: newWeight.value / 100, // Convertendo de volta para kg
    });
  });

export default route;
