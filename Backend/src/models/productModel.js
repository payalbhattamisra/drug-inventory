import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: [true, 'Seller ID is required'],
        trim: true,
    },
    manufacturerId: {
        type: String,
        required: [true, 'Manufacturer ID is required'],
        trim: true,
    },
    orderDate: {
        type: Date,
        required: [true, 'Order date is required'],
    },
    orderTotal: {
        type: Number,
        required: [true, 'Order total is required'],
        min: [0, 'Order total cannot be negative'],
    },
    orderQuantity: {
        type: Number,
        required: [true, 'Order quantity is required'],
        min: [0, 'Order quantity cannot be negative'],
    },
    medicines: [
        {
            name: {
                type: String,
                required: [true, 'Medicine name is required'],
                trim: true,
            },
            quantity: {
                type: Number,
                required: [true, 'Medicine quantity is required'],
                min: [0, 'Medicine quantity cannot be negative'],
            }
        }
    ],
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Product = mongoose.model('Product', productSchema);

export default Product;
