import { IncomingMessage, ServerResponse } from "http";

function breakText(text: string) {
	const MAX_LENGTH = 80;
	let lines = [];
	let currentLine = "";
	let words = text.split(" ");

	words.forEach((word) => {
		if (currentLine.length + word.length <= MAX_LENGTH) {
			// Add the word to the current line
			currentLine += " " + word;
		} else {
			// Add the current line to the lines array and start a new line
			lines.push(currentLine.trim());
			currentLine = word;
		}
	});

	// Add the last line to the lines array
	lines.push(currentLine.trim());

	// Join the lines array with newline characters and print the result
	return lines.join("\n");
}

export function root(req: IncomingMessage, res: ServerResponse) {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("root");
}

export function justify(req: IncomingMessage, res: ServerResponse) {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		try {
			let result = breakText(body);
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end(body);
		} catch (error) {
			console.error(error);
			res.writeHead(400, { "Content-Type": "text/plain" });
			res.end("Bad Request");
		}
	});
}

export function token(req: IncomingMessage, res: ServerResponse) {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("token");
}
