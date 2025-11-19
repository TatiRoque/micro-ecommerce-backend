import { Router } from "express";
import { getDispersionPrecioCantidad } from "../controllers/stats.controller.js";
import { getMetodosPagoPorFecha} from "../controllers/stats.controller.js";
import { getUnidadesVendidasPorCategoria } from "../controllers/stats.controller.js";
import { getCorrelacionPearson } from "../controllers/stats.controller.js";

const router = Router();

router.get("/ventas-por-productos", getDispersionPrecioCantidad);
router.get("/metodos-pago-tiempo", getMetodosPagoPorFecha);
router.get("/unidades-vendidas-categoria", getUnidadesVendidasPorCategoria);
router.get("/correlacion-precio-cantidad", getCorrelacionPearson);

export default router;
