import axios from 'axios';

export const registerProduct = async (productData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error registering product:', error);
        throw error;
    }
};
