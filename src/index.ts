import http, { IncomingMessage, ServerResponse } from "http";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT);
const host: string =
  process.env.NODE_ENV === "development" ? "localhost" : "PROD_URL";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    router.handle(req, res);
  }
);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
