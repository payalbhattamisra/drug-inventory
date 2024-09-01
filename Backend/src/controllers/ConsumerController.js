import Consumer from '../models/ConsumerModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerConsumer = async (req, res) => {
    try {
        const { instituteName, email, password, location, pincode, licenseNumber } = req.body;

        // Check if the consumer already exists
        const existingConsumer = await Consumer.findOne({ email });
        if (existingConsumer) {
            return res.status(400).json({ message: 'Consumer with this email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new consumer
        const newConsumer = new Consumer({
            instituteName,
            email,
            password: hashedPassword,
            location,
            pincode,
            licenseNumber,
        });

        // Save the consumer to the database
        await newConsumer.save();

        res.status(201).json({ message: 'Consumer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
export const loginconsumer = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the manufacturer by email
      const consumer = await Consumer.findOne({ email });
      if (!consumer) {
        return res.status(400).json({ message: ' Consumer not found' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, consumer.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id: consumer._id, email: consumer.email },
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