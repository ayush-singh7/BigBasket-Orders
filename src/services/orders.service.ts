import { Router, Request, Response } from 'express';
import OrderModel from '../database/models';
import { Mongoose,  } from 'mongoose';
import  mongoose from "mongoose";

class OrderServices {

    constructor() {
    }
    
    placeOrder = async(payload:any, id:string)=>{
        try{
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
    applyCoupon = async(payload:any,id:string) =>{
        try{
            let _id = new mongoose.Types.ObjectId(id);
            let totalAmount = await OrderModel.findById({_id:_id},{totalAmount:1});
            if(totalAmount){
                let reducedValue = +totalAmount * (1 - payload.percent / 100);
                let response = await OrderModel.updateOne({_id:_id},{totalAmount:reducedValue})
                return response;
            }else{
                return Promise.reject("Order does not exist")
            }
        }catch(error){
            return Promise.reject(error);
        }
    }
    


}

export const orderServices = new OrderServices()