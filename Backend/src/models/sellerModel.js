import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    unique_seller_id: { type: Number, required: true, unique: true },
    seller_name: { type: String, required: true },
    seller_license: { type: Number, required: true },
    seller_location: { type: String, required: true },
    seller_pin_code: { type: Number, required: true },
    contact_email: { type: String, required: true },
    contact_phone: { type: String, required: true },
    seller_type: { type: String, required: true },
    seller_address: { type: String, required: true },
    seller_city: { type: String, required: true },
    seller_state: { type: String, required: true },
    seller_country: { type: String, required: true }
},{timestamps:true});

export default mongoose.model('Seller', sellerSchema);
