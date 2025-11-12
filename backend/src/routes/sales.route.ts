import { Router } from 'express';
import {getSaleById, getSales, createSale} from '../controllers/sales.controller.js';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/', createSale);




export default router;
