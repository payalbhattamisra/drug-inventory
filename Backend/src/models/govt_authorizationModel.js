import mongoose   from 'mongoose';
import Seller from './sellerModel.js';
import Manufacturer from "./manufacturerModel.js"

const govt_AuthorizationSchema = new mongoose.Schema({
    government_authorization_id: { type: Number, required: true },
    seller_name: { type: String, required: true },
    seller_license: { type: Number, required: true },
    manufacturer_name: { type: String, required: true },
    manufacturer_license: { type: Number, required: true },
    seller_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }],
    manufacturer_id: { type: mongoose.Schema.Types.ObjectId,ref:'Manufacturer', required: true },
    authorization_date: { type: Date, required: true },
    expiration_date: { type: Date, required: true },
    authorization_type: { type: String, required: true },
    authorization_status: { type: String, required: true }
},{timestamps:true});

export const  govt_Authorization=mongoose.model("govt_Authorization", govt_AuthorizationSchema)
