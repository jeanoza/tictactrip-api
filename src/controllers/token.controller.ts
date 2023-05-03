import { Response, Request } from "express";
import JwtModule from "../modules/jwt.module";
import limit from "../modules/limit.modules";

export default class TokenController {
  static validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  sendToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!TokenController.validateEmail(email))
        throw new Error("Email invalid");

      const token = JwtModule.generate(email);
      limit[token] = 0;
      res.status(200).send(token);
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .send(error instanceof Error ? error.message : "Bad request");
    }
  }
}
