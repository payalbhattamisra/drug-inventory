import Product from '../models/productModel.js';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';

// Function to generate a secure password
const generatePassword = async () => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash('temporaryPassword', salt); // Generate a hashed password
};

// Create a new product and generate a QR code
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const password = await generatePassword();

        const product = new Product({ name, description, price, password });
        await product.save();
        
        // Generate a QR code for the product URL
        const productUrl = `http://192.168.55.47:8000/api/products/${product._id}`;
        const qrCode = await QRCode.toDataURL(productUrl);
        
        res.json({ qrCode, productId: product._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get product details by ID and display in a styled HTML page
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select('-password');
        if (product) {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Product Details</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .product-container {
                            max-width: 800px;
                            margin: 50px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            text-align: center;
                            color: #333;
                            margin-bottom: 30px;
                        }
                        .product-details {
                            font-size: 18px;
                            line-height: 1.6;
                            color: #555;
                        }
                        .product-details p {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="product-container">
                        <h1>Product Details</h1>
                        <div class="product-details">
                            <p><strong>Product Name:</strong> ${product.name}</p>
                            <p><strong>Description:</strong> ${product.description}</p>
                            <p><strong>Price:</strong> $${product.price}</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
