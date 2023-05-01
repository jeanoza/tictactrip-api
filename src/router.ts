import url from "url";
import { justify, token, root } from "./handler";
import { IncomingMessage, ServerResponse } from "http";

interface Routes {
	[key: string]: any;
}
const router: Routes = {
	routes: {
		GET: {},
		POST: {},
		PUT: {},
		DELETE: {},
	},

	add: function (method: string, url: string, handler: CallableFunction) {
		this.routes[method][url] = handler;
	},

	handle: function (req: IncomingMessage, res: ServerResponse) {
		const method = req.method;
		const path = url.parse(req.url!).pathname;
		const handler = this.routes[method!][path!];

		if (handler) handler(req, res);
		else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
		}
	},
};

// Add some routes to the router
router.add("GET", "/", root);
router.add("POST", "/api/justify", justify);
router.add("POST", "/api/token", token);

export default router;
