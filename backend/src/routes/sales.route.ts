import { Router } from 'express';
import {
    getSaleById,
  getSales,
} from '../controllers/sales.controller.js';

const router = Router();

// GET todas las ventas
router.get('/', getSales);
router.get('/:id', getSaleById)

// GET venta por ID (incluye detalles y productos)


export default router;
