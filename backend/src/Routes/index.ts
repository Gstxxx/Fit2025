import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoutes from "../Controllers/auth";
import weightsRoutes from "../Controllers/weights";

const routes = new Hono();

routes.use("/*", cors()).use("/*", logger());

routes.route("/", weightsRoutes);
routes.route("/", authRoutes);

export default routes;
