import { Response, Request } from "express";
import limit from "../modules/limit.modules";
import JwtModule from "../modules/jwt.module";

export default class JustifyController {
  static LIMIT_BY_DAY = 80000;
  /**
   * J'ai essayé sans regex afin de mettre le dernier mot à la même position
   * en ajoutant espace entre les mots.
   * Ca n'a pas marché comme output.txt
   * D'ailleurs, même quand j'ai utilisé une bibliothèque externe(word-wrap) pour voir,
   * Elle ne donne pas non plus le même resultat que output.txt.
   * Comme j'ai fait de mon mieux(pendant 2 jours), j'arrête ici.
   * mais je veux bien que tu m'explique comment tu as fait:)
   */
  static breakText(text: string) {
    return text.replace(/(.{1,80})(\s+|$)/g, "$1\n");
  }

  justify(req: Request, res: Response) {
    try {
      const result = JustifyController.breakText(req.body);
      const wordCount = result.match(/\b\w+\b/g)?.length;

      const token = req.headers.authorization;
      if (token) {
        if (limit[token] === undefined)
          throw new Error("Need to generate token to request");
        if (limit[token] > JustifyController.LIMIT_BY_DAY)
          throw new Error("Payment required");
        if (wordCount && JwtModule.verify(token)) limit[token] += wordCount;
      }
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res
        .status(402)
        .send(error instanceof Error ? error.message : "Bad request");
    }
  }
}
