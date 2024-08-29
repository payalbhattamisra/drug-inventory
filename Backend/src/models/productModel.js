import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: [true, 'Seller ID is required'],
        trim: true,
    },
    sellerName: {
        type: String,
        required: [true, 'Seller name is required'],
        trim: true,
    },
    manufacturerId: {
        type: String,
        required: [true, 'Manufacturer ID is required'],
        trim: true,
    },
    manufacturerName: {
        type: String,
        required: [true, 'Manufacturer name is required'],
        trim: true,
    },
    orderDate: {
        type: Date,
        required: [true, 'Order date is required'],
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
            },
            price: {
                type: Number,
                required: [true, 'Medicine price is required'],
                min: [0, 'Medicine price cannot be negative'],
            }
        }
    ],
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
    },
    orderTotal: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
// Virtual field to calculate the total order price
productSchema.virtual('totalPrice').get(function() {
    return this.medicines.reduce((total, med) => total + med.quantity * med.price, 0);
});

// Before saving, calculate and set the orderTotal
productSchema.pre('save', function(next) {
    this.orderTotal = this.totalPrice;
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
