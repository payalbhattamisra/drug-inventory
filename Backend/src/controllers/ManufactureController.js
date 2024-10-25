import Manufacturer from '../models/ManufactureModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Manufacturer
export const registerManufacturer = async (req, res) => {
    try {
        const { name, email, password, pincode, manufacturerId } = req.body;

        // Check if the manufacturer already exists
        const existingManufacturer = await Manufacturer.findOne({ email });
        if (existingManufacturer) {
            return res.status(400).json({ message: 'Manufacturer with this email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new manufacturer
        const newManufacturer = new Manufacturer({
            name,
            email,
            password: hashedPassword,
            pincode,
            manufacturerId,
        });

        // Save the manufacturer to the database
        await newManufacturer.save();

        res.status(201).json({ message: 'Manufacturer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login Manufacturer
export const loginManufacturer = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Find the manufacturer by email
        const manufacturer = await Manufacturer.findOne({ email });
        if (!manufacturer) {
            return res.status(400).json({ message: 'Manufacturer not found' });
        }
  
        // Compare the password
        const isMatch = await bcrypt.compare(password, manufacturer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        // Create a JWT token using 'shsh' as the secret
        const token = jwt.sign(
            { id: manufacturer._id, email: manufacturer.email, manufacturerId: manufacturer.manufacturerId },
            "shsh",  // Using 'shsh' as the secret
            { expiresIn: '1h' } // Token expiry time
        );
  
        // Set the token in cookies
        res.cookie("token", token, { httpOnly: true });
        res.json({
            message: 'Login successful',
            token,
            manufacturerId: manufacturer.manufacturerId,
            name: manufacturer.name,
            medicines: manufacturer.medicines || [],
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Middleware to check if manufacturer is logged in
export  function isLoggedIn(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'shsh'); // Secret should match the one used in login
    req.user = decoded;  // Attach user data to req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
}


// Get Manufacturer Details
export const getManufacturerDetails = async (req, res) => {
    try {
        const products = await productModel.find({ sellerId: req.user.manufacturerId });
  
        const filteredProducts = products.map(product => ({
            sellerId: product.sellerId,
            manufacturerId: product.manufacturerId,
            medicines: product.medicines,
            orderDate: product.orderDate,
            _id: product._id
        }));
  
        res.json(filteredProducts); 
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        res.status(500).send('An error occurred while fetching product data.');
    }
};
