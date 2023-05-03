import dotenv from "dotenv";
import express, { Request, Response } from "express";
import justify from "./routes/justify.route";
import token from "./routes/token.route";

dotenv.config();

const port = process.env.PORT || 4221;
const nodeEnv = process.env.NODE_ENV;

const app = express();

app.use(express.json());
app.use(express.text());

app.use("/api/justify", justify);
app.use("/api/token", token);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[${nodeEnv}]Server running at http://localhost:${port}/`);
});
