import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { orderServices } from '../services/orders.service';
import UserModel from '../database/models';

class OrderControllers {

    constructor() {
    }
    
    placeOrder=async(req:Request, res:Response) =>{
        
        try{
           let response =  await orderServices.placeOrder(req.body)   

            res.send(response);

        }catch(error){
            console.log(error,'---');
            
            return error;
        }
        
    }

    

}

export const orderControllers = new OrderControllers()