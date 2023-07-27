import express from 'express';
const router = express.Router();
import User from '../models/user.js';
// import { RepeatOutlined } from '@material-ui/icons'; // Unused import, you can remove it

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, username } = req.body;
        const user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(400).json({
                message: 'User already registered'
            });
        }

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Error in the sign"
                });
            }
            if (data) {
                return res.status(201).json({
                    user: data
                });
            }
        });
        
    } 
    
    catch (error) {
        return res.status(400).json({
            message: "Something went wrong"
        });
    }
});

export default router;
