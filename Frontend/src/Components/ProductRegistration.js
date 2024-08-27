import React, { useState } from 'react';
import { registerProduct } from '../api';

const ProductRegistration = () => {
    const [products, setProducts] = useState([{
        sellerId: '',
        manufacturerId: '',
        orderDate: '',
        orderTotal: '',
        orderQuantity: '',
        medicines: [{ name: '', quantity: '' }],
        pincode: ''
    }]);
    const [qrCode, setQrCode] = useState('');
    const [productUrl, setProductUrl] = useState('');

    const handleProductChange = (index, field, value) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setProducts(updatedProducts);
    };

    const handleMedicineChange = (productIndex, medicineIndex, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].medicines[medicineIndex] = {
            ...updatedProducts[productIndex].medicines[medicineIndex],
            [field]: value
        };
        setProducts(updatedProducts);
    };
 
    const handleAddMedicine = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].medicines.push({ name: '', quantity: '' });
        setProducts(updatedProducts);
    };

    const handleRemoveMedicine = (productIndex, medicineIndex) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].medicines.splice(medicineIndex, 1);
        setProducts(updatedProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const product of products) {
                const productData = {
                    sellerId: product.sellerId,
                    manufacturerId: product.manufacturerId,
                    orderDate: product.orderDate,
                    orderTotal: parseFloat(product.orderTotal),
                    orderQuantity: parseInt(product.orderQuantity, 10),
                    medicines: product.medicines,
                    pincode: product.pincode
                };

                const data = await registerProduct(productData);

                if (data.dataMatrixCode) {
                    setQrCode(data.dataMatrixCode);
                    const url = `http://localhost:3000/api/products/${data.productId}`; // Update this URL if necessary
                    setProductUrl(url);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h1>Register Products</h1>
            <form onSubmit={handleSubmit}>
                {products.map((product, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Product {index + 1}</h3>

                        <label htmlFor={`sellerId-${index}`}>Seller ID:</label>
                        <input
                            type="text"
                            id={`sellerId-${index}`}
                            value={product.sellerId}
                            onChange={(e) => handleProductChange(index, 'sellerId', e.target.value)}
                            required
                        />

                        <label htmlFor={`manufacturerId-${index}`}>Manufacturer ID:</label>
                        <input
                            type="text"
                            id={`manufacturerId-${index}`}
                            value={product.manufacturerId}
                            onChange={(e) => handleProductChange(index, 'manufacturerId', e.target.value)}
                            required
                        />

                        <label htmlFor={`orderDate-${index}`}>Order Date:</label>
                        <input
                            type="date"
                            id={`orderDate-${index}`}
                            value={product.orderDate}
                            onChange={(e) => handleProductChange(index, 'orderDate', e.target.value)}
                            required
                        />

                        <label htmlFor={`orderTotal-${index}`}>Order Total:</label>
                        <input
                            type="number"
                            id={`orderTotal-${index}`}
                            value={product.orderTotal}
                            onChange={(e) => handleProductChange(index, 'orderTotal', e.target.value)}
                            required
                        />

                        <label htmlFor={`orderQuantity-${index}`}>Order Quantity:</label>
                        <input
                            type="number"
                            id={`orderQuantity-${index}`}
                            value={product.orderQuantity}
                            onChange={(e) => handleProductChange(index, 'orderQuantity', e.target.value)}
                            required
                        />

                        <label>Medicines:</label>
                        {product.medicines.map((medicine, medIndex) => (
                            <div key={medIndex} style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="Medicine Name"
                                    value={medicine.name}
                                    onChange={(e) => handleMedicineChange(index, medIndex, 'name', e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={medicine.quantity}
                                    onChange={(e) => handleMedicineChange(index, medIndex, 'quantity', e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => handleRemoveMedicine(index, medIndex)}>
                                    Remove Medicine
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddMedicine(index)}>
                            + Add Another Medicine
                        </button>

                        <label htmlFor={`pincode-${index}`}>Pincode:</label>
                        <input
                            type="text"
                            id={`pincode-${index}`}
                            value={product.pincode}
                            onChange={(e) => handleProductChange(index, 'pincode', e.target.value)}
                            required
                        />
                    </div>
                ))}
 

                <button type="submit">Register Products</button>
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
