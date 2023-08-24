import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

interface Product extends Document {
  productId:any,
  productName:string,
}

interface Order extends Document {
  userId:any,
  orderStatus:string,
  productList:Array<Product>
}

const productSchema  = new Schema<Product>({
  productId: { type:mongoose.Schema.Types.ObjectId },
  productName: {type:String, required:true},
})

// const ProductModel = mongoose.model<Product>('Product',productSchema)

const orderSchema = new Schema<Order>({
  userId: { type:mongoose.Schema.Types.ObjectId,requried:true },
  orderStatus:{type:String},
  productList: [productSchema]
});

// Create the User model
const OrderModel = mongoose.model<Order>('Order', orderSchema);

export default OrderModel;