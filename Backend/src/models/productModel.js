import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    password: {
        type: String,
        required: true
    }
});

// Middleware to hash password before saving
productSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
