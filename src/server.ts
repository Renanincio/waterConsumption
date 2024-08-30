import { app } from "./app";
import { env } from "./env";

app.get("/hello", async () => {
  return "hello world";
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTp Server Running!");
  });
