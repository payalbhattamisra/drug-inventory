import Manufacturer from '../models/ManufactureModel.js';
import bcrypt from 'bcryptjs';
//login
import jwt from 'jsonwebtoken';
export const registerManufacturer = async (req, res) => {
    try {
        const { name, email, password, pincode } = req.body;

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
        });

        // Save the manufacturer to the database
        await newManufacturer.save();

        res.status(201).json({ message: 'Manufacturer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
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
  
      // Create a JWT token
      const token = jwt.sign(
        { id: manufacturer._id, email: manufacturer.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiry time
      );
  
      res.json({
        message: 'Login successful',
        token // Send token to client
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };