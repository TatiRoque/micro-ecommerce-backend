import { Router } from 'express';
import { getSales, getSale, deleteSale, postSale, putSale } from '../controllers/sales.controller.js';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSale);
router.delete('/:id', deleteSale);
router.post('/', postSale);
router.put('/:id', putSale);

export default router;