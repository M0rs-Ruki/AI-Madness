
import User from '../models/userModels.js';
import { log } from 'console';
import generateToken from '../utils/generateTokenUtlis.js';
import { hashPass, comparePass } from '../utils/bcryptPasswordUtlis.js';


const register = async (req, res) => {
    try {
        
        log(req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPass(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser);
        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        });

        res.status(201).json({
        message: "User created successfully",
        user: {
            name: newUser.name,
            email: newUser.email,
        },
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while registering the user." });
    }
}





export { register };