import { Server } from '@grpc/grpc-js';
// import { routesV1 } from './v1/v1.routes';
import { Router } from 'express';
import { orderControllers } from '../controllers/order.controllers';
// import { testRoute } from './test.routes';


class Routes {
    private route: Router;

    constructor() {
        this.route = Router();
    }

    /**
     * @description Load All Services
     * @param {Server} grpcServer
     * @param authPackage
     */
    loadAllServices(grpcServer: Server, authPackage: any) {
        
                
    }

    /**
     * @description Load All Routes
     */
    loadAllRoutes() {
        this.route.post('/place-order', orderControllers.placeOrder);
        
        return this.route;
    }
}

export const routes = new Routes();
