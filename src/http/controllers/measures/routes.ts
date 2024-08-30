import { FastifyInstance } from "fastify";
import { Confirm } from "./confirm";
import { Upload } from "./upload";
import { List } from "./list";

export async function measuresRoutes(app: FastifyInstance) {
  app.post("/upload", Upload);
  app.get("/:customer_code/", List);
  app.patch("/confirm", Confirm);
}
