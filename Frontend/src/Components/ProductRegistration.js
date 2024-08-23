import React, { useState } from 'react';
import { registerProduct } from '../api';

const ProductRegistration = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [productUrl, setProductUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, description, price: parseFloat(price) };

        try {
            const data = await registerProduct(productData);
            if (data.qrCode) {
                setQrCode(data.qrCode);
                const url = `http://localhost:3000/api/products/${data.productId}`; // Update this URL if necessary
                setProductUrl(url);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h1>Register Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <button type="submit">Register Product</button>
            </form>

            {qrCode && (
                <div className="qr-code">
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}

            {productUrl && (
                <div className="qr-url">
                    Product URL: <a href={productUrl} target="_blank" rel="noopener noreferrer">{productUrl}</a>
                </div>
            )}
        </div>
    );
};

export default ProductRegistration;
