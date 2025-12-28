import { Router } from "express";
import EntregasServices from "../services/entregasServices.js";
import EntregaController from "../controllers/EntregaController.js";

const routerEntrega = Router();

const entregaService = new EntregasServices();
const entregasController = new EntregaController(entregaService);

routerEntrega.get('/', (req, res ) => entregasController.getAllEntregas(req, res));
routerEntrega.get('/:id', (req, res ) => entregasController.getById(req, res));
routerEntrega.post('/', (req, res) => entregasController.newEntrega(req, res));

export default routerEntrega;
