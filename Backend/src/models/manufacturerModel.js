import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
    unique_manufacturer_id: { type: Number, required: true, unique: true },
    manufacturer_name: { type: String, required: true },
    manufacturer_license: { type: Number, required: true },
    manufacturer_location: { type: String, required: true },
    manufacturer_pin_code: { type: Number, required: true },
    contact_email: { type: String, required: true },
    contact_phone: { type: String, required: true },
    manufacturer_type: { type: String, required: true },
    manufacturer_address: { type: String, required: true },
    manufacturer_city: { type: String, required: true },
    manufacturer_state: { type: String, required: true },
    manufacturer_country: { type: String, required: true }
},{timestamps:true});

export default mongoose.model('Manufacturer', manufacturerSchema);
