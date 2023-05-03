import http, { IncomingMessage, ServerResponse } from "http";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    router.handle(req, res);
  }
);

server.listen(port, () => {
  console.log(`[${nodeEnv}]Server running at http://localhost:${port}/`);
});
