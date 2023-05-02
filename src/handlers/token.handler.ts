import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";

function validateEmail(email: string) {
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

      console.log(process.env.JWT_SECRET);

      const token = jwt.sign({ email: "foo@bar.com" }, "secret", {
        expiresIn: "1d",
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(token);
    } catch (error: Error | unknown) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(error instanceof Error ? error.message : "Bad request");
    }
  });
}
