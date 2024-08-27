import mongoose from 'mongoose';

const receivedOrderDetailsSchema = new mongoose.Schema({
    unique_order_id: { type: mongoose.Schema.Types.Number, ref: 'Orders', required: true },
    dispatch_date: { type: Date, required: true },
    real_delivery_date: { type: Date, required: true },
    medicine_name: { type: String, required: true },
    received_quantity: { type: Number, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    manufacturer_location: { type: String, required: true },
    quality_check_status: { type: String, required: true },
    quality_check_date: { type: Date, required: true },
    quality_check_result: { type: String, required: true }
});

export default mongoose.model('ReceivedOrderDetails', receivedOrderDetailsSchema);
