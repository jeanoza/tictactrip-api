import { Router } from "express";
import JustifyController from "../controllers/justify.controller";

const router = Router();
const controller = new JustifyController();

router.post("/", controller.justify);

export default router;
