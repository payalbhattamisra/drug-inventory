import mongoose from 'mongoose';
import Seller from "./sellerModel";
import Manufacturer from "./manufacturerModel";

const ordersSchema = new mongoose.Schema({
    unique_order_id: { type: Number, required: true, unique: true },
    manufacturer_id: { type: mongoose.Schema.Types.Number, ref: 'Manufacturer', required: true },
    seller_id: { type: mongoose.Schema.Types.Number, ref: `${Seller}`, required: true },
    data_matrix_code: { type: String, required: true },
    order_date: { type: Date, required: true },
    status: { type: String, required: true },
    order_total: { type: mongoose.Schema.Types.Decimal128, required: true },
    payment_method: { type: String, required: true },
    payment_status: { type: String, required: true }
});

export default mongoose.model('Orders', ordersSchema);
