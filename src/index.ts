import http, { IncomingMessage, ServerResponse } from "http";
import router from "./router";

const port = 4221;
const hostname = "localhost";

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		router.handle(req, res);
	}
);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
