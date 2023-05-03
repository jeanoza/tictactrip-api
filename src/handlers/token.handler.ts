import { IncomingMessage, ServerResponse } from "http";
import * as JwtModule from "../modules/jwt.module";
import limit from "../modules/limit.modules";

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function token(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const email = JSON.parse(body).email;
      if (!validateEmail(email)) throw new Error("Email invalid");

      const token = JwtModule.generate(email);
      limit[token] = 0;
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(token);
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(error instanceof Error ? error.message : "Bad request");
    }
  });
}
