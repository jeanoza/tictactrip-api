import { Router } from "express";
import TokenController from "../controllers/token.controller";

const router = Router();
const controller = new TokenController();

router.post("/", controller.sendToken);

export default router;
