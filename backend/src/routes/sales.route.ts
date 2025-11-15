import { Router } from 'express';
import {getSaleById, getSales, createSale, updateSale, deleteSale} from '../controllers/sales.controller.js';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);




export default router;
