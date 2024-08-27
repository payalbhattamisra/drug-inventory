import Product from '../models/productModel.js';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';
import bwipjs from 'bwip-js';

// Function to generate a secure password
const generatePassword = async () => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash('temporaryPassword', salt); // Generate a hashed password
};
export const createProduct = async (req, res) => {
    try {
        const { sellerId, manufacturerId, orderDate, orderTotal, orderQuantity, medicines, pincode } = req.body;

        const product = new Product({
            sellerId,
            manufacturerId,
            orderDate,
            orderTotal,
            orderQuantity,
            medicines,
            pincode
        });

        await product.save();

        // Generate a Data Matrix code for the product URL
        const productUrl = `http://192.168.55.47:8000/api/products/${product._id}`;
        bwipjs.toBuffer({
            bcid: 'datamatrix',       // Barcode type
            text: productUrl,         // Text to encode
            scale: 5,                 // 3x scaling factor
            height: 20, 
            includetext: false,       // Show human-readable text
        }, (err, png) => {
            if (err) {
                res.status(500).json({ message: 'Error generating Data Matrix code', error: err });
            } else {
                const dataMatrixCode = `data:image/png;base64,${png.toString('base64')}`;
                res.json({ dataMatrixCode, productId: product._id });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
 // Get and display the most recently registered product
export const getProduct = async (req, res) => {
    try {
        // Fetch the most recently created product
        const latestProduct = await Product.findOne().sort({ createdAt: -1 });

        if (latestProduct) {
            // Create HTML for the latest product
            const productHtml = `
                <div class="product-item">
                    <h2>Product #${latestProduct._id}</h2>
                    <p><strong>Seller ID:</strong> ${latestProduct.sellerId}</p>
                    <p><strong>Manufacturer ID:</strong> ${latestProduct.manufacturerId}</p>
                    <p><strong>Order Date:</strong> ${new Date(latestProduct.orderDate).toDateString()}</p>
                    <p><strong>Order Total:</strong> $${latestProduct.orderTotal}</p>
                    <p><strong>Order Quantity:</strong> ${latestProduct.orderQuantity}</p>
                    <p><strong>Pincode:</strong> ${latestProduct.pincode}</p>
                    <p><strong>Medicines:</strong></p>
                    <ul>
                        ${latestProduct.medicines.map(med => `<li>${med.name} (Quantity: ${med.quantity})</li>`).join('')}
                    </ul>
                </div>
            `;

            // Send the HTML response
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Latest Product</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                        }
                        .product-container {
                            max-width: 1000px;
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
                        .product-item {
                            border-bottom: 1px solid #ddd;
                            padding: 10px 0;
                        }
                        .product-item:last-child {
                            border-bottom: none;
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            margin: 5px 0;
                            font-size: 18px;
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <div class="product-container">
                        <h1>Latest Product</h1>
                        ${productHtml}
                    </div>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('No products found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest product', error });
    }
};
