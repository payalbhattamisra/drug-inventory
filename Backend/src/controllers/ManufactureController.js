import Manufacturer from '../models/ManufactureModel.js';
import bcrypt from 'bcryptjs';

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
