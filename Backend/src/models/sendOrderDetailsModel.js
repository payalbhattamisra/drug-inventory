import mongoose from 'mongoose';

const sendOrderDetailsSchema = new mongoose.Schema({
    unique_order_id: { type: mongoose.Schema.Types.Number, ref: 'Orders', required: true },
    dispatch_date: { type: Date, required: true },
    expected_delivery_date: { type: Date, required: true },
    medicine_name: { type: String, required: true },
    sent_quantity: { type: Number, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    seller_location: { type: String, required: true },
    tracking_number: { type: String, required: true },
    shipping_carrier: { type: String, required: true },
    shipping_service: { type: String, required: true }
});

export default mongoose.model('SendOrderDetails', sendOrderDetailsSchema);
