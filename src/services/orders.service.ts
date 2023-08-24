import { Router, Request, Response } from 'express';
import OrderModel from '../database/models';
import { Mongoose,  } from 'mongoose';
import  mongoose from "mongoose";

class OrderServices {

    constructor() {
    }
    
    placeOrder = async(payload:any)=>{
        try{
            console.log(payload,'PL');
            const id = new mongoose.Types.ObjectId('64db2151f085fd0773961c7f');
            
            let response = await OrderModel.create({
                userId: new mongoose.Types.ObjectId(id),
                orderStatus: payload.orderStatus,
                productList: payload.productList
            });
            return response;
        }catch(error){
            return Promise.reject(error);
        }
    }
    
    


}

export const orderServices = new OrderServices()