import Consumer from '../models/ConsumerModel.js';
import bcrypt from 'bcryptjs';

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
