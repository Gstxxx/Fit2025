import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import routes from "./Routes";

const app = new Hono();

app.use("*", cors());

app.route("/", routes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
