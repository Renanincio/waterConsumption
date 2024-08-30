import { FastifyInstance } from "fastify";
import { Upload } from "./upload";
import { List } from "./List";

export async function measuresRoutes(app: FastifyInstance) {
  app.post("/upload", Upload);
  app.get("/:customer_code/", List);
}
