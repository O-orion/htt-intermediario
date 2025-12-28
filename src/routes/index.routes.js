import { Router } from "express";
import routerEntrega from "./entrega.routes.js";

const router = Router();

router.use('/entregas', routerEntrega)

export default router;