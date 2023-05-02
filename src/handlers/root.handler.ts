import { IncomingMessage, ServerResponse } from "http";

export default function root(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("root");
}
