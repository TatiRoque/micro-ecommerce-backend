import express from 'express';
import type { Application, Request, Response } from 'express';
import routesProduct from '../routes/products.routes.js'
import routesSale from '../routes/sales.route.js'
import routesClient from '../routes/clients.routes.js'
import routesStats from '../routes/stats.routes.js'
import db from '../db/connection.js';



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        this.midlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Funcionando'
            })
        })
        this.app.use('/api/productos', routesProduct)
        this.app.use('/api/ventas', routesSale)
        this.app.use('/api/clientes', routesClient)
        this.app.use('/api/estadisticas', routesStats)
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async dbConnect() {
        try {
            await db.authenticate()
            console.log('base de datos conectada :D')
        } catch (error) {
            console.error('base de datos no conectada :C')
        }
    }
}
export default Server;