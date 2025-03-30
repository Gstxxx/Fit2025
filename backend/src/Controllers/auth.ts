import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { loginSchema, registerSchema } from "../schemas/auth";
import { authMiddleware } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const route = new Hono()
  .basePath("/auth")
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password, height } = await c.req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ error: "Email já cadastrado" }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        height,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return c.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        height: user.height,
      },
    });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ error: "Email ou senha incorretos" }, 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return c.json({ error: "Email ou senha incorretos" }, 401);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return c.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        height: user.height,
      },
    });
  })
  .get("/me", authMiddleware, async (c) => {
    const user = await prisma.user.findUnique({
      where: { id: c.get("user").userId },
      select: {
        id: true,
        name: true,
        email: true,
        height: true,
      },
    });

    if (!user) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }

    return c.json(user);
  });

export default route;
