import { IncomingMessage, ServerResponse } from "http";

/**
 * J'ai essayé sans regex afin de mettre le dernier mot à la même position
 * en ajoutant espace entre les mots.
 * Ca n'a pas marché comme output.txt
 * D'ailleurs, même quand j'ai utilisé une bibliothèque externe(word-wrap) pour voir,
 * Elle ne donne pas non plus le même resultat que output.txt.
 * Comme j'ai fait de mon mieux(pendant 2 jours), j'arrête ici.
 * mais je veux bien que tu m'explique comment tu as fait:)
 */
function breakText(text: string) {
  return text.replace(/(.{1,80})(\s+|$)/g, "$1\n");
}

export default function justify(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      let result = breakText(body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(result);
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
    }
  });
}
