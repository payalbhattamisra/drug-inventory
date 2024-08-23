import Product from '../models/productModel.js';
import QRCode from 'qrcode';

// Create a new product and generate a QR code
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        await product.save();
        
        // Generate a QR code for the product URL
        const productUrl = `http://192.168.55.47:8000/api/products/${product._id}`;
        const qrCode = await QRCode.toDataURL(productUrl);
        
        res.json({ qrCode, productId: product._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get product details by ID
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
