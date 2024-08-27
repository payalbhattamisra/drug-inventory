import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medicine_id: { type: Number, required: true, unique: true },
    medicine_name: { type: String, required: true },
    medicine_description: { type: String, required: true },
    medicine_type: { type: String, required: true },
    medicine_price: { type: mongoose.Schema.Types.Decimal128, required: true },
    manufacturer_id: { type: mongoose.Schema.Types.Number, ref: 'Manufacturer', required: true }
});

export default mongoose.model('Medicine', medicineSchema);
