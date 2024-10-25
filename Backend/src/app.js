import express from 'express'

import cookieParser from 'cookie-parser'
import cors from "cors"
const app=express()
//use method use for middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//3 express configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.get('/profile', isLoggedIn, async (req, res) => {
    console.log(req.user); 
    try {
        const products = await ProductModel.find({ sellerId: req.user.userID });
        
        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this user.' });
        }

        const filteredProducts = products.map(product => ({
            sellerId: product.sellerId,
            manufacturerId: product.manufacturerId,
            productName: product.productName,
            productDate: product.productDate,
            _id: product._id 
        }));

        res.json(filteredProducts); 
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        res.status(500).send('An error occurred while fetching product data.');
    }
});

export {app}