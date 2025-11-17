import { Router } from "express";
import {getClient, getClients} from "../controllers/clients.controller.js"

const router = Router();

router.get('/', getClients);
router.get('/:id', getClient);

export default router;