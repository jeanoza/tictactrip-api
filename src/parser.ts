import { IncomingMessage, ServerResponse } from "http";

export async function customParser(req: IncomingMessage, res: ServerResponse) {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", async () => {
		try {
			const data = await JSON.parse(body);
			console.log("end", data);
			return data;
			//res.writeHead(200, { "Content-Type": "text/plain" });
			//res.end("justify");
		} catch (error) {
			return () => {
				console.error(error);
				res.writeHead(400, { "Content-Type": "text/plain" });
				res.end("Bad Request");
			};
		}
	});
}
