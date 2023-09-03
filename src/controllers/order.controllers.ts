import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { orderServices } from '../services/orders.service';
import UserModel from '../database/models';

class OrderControllers {

    constructor() {
    }

    placeOrder = async (req: Request, res: Response) => {

        try {

            let response = await orderServices.placeOrder(req.body, req.body.userData.userId)

            res.send(response);

        } catch (error) {
            console.log(error, '---');
            return Promise.reject(error);
        }

    }

    applyCoupon = async (req:Request, res:Response) =>{
        try {

            let response = await orderServices.applyCoupon(req.body, req.body.userData.userId)

            res.send(response);

        } catch (error) {
            console.log(error, '---');
            return Promise.reject(error);
        }
    }

    

}

export const orderControllers = new OrderControllers()