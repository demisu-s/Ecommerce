import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, username } = req.body;
        const user = await User.findOne({ email }).exec();
        
        if (user) {
            return res.status(400).json({
                message: 'User already registered'
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            hash_password: hashedPassword,
            username: Math.random().toString()
        });

        const savedUser = await newUser.save();
        return res.status(200).json({
            user: savedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong"
        });
    }
});

export default router;
