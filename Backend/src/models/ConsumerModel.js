import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: [true, 'Institute/Hospital name is required'],
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
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
    },
    licenseNumber: {
        type: String,
        required: [true, 'License Number is required'],
        trim: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
