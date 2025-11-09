import express from 'express';
import type { Application, Request, Response } from 'express';
import routesProduct from '../routes/products.routes.js'
import routesSale from '../routes/sales.route.js'
import routesClient from '../routes/clients.routes.js'
import db from '../db/connection.js';

class Server {
    private app:Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen()
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    //configurar ruta
    routes(){
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Funcionando'
            })
        })
        this.app.use('/api/products', routesProduct)
        this.app.use('/api/sales', routesSale)
        this.app.use('/api/clients', routesClient)
    }

    midlewares(){
        //Se parsea el body
        this.app.use(express.json())
    }

    async dbConnect() {
        try{
            await db.authenticate()
            console.log('base de datos conectada')
        }catch(error){
            console.error('base de datos no conectada :C')
        }
    }



}
export default Server;