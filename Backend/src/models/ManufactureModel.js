import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Manufacturer name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
     
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;
