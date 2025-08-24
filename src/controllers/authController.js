
import User from '../models/userModels.js';
import { log } from 'console';
import generateToken from '../utils/generateTokenUtlis.js';
import { hashPass, comparePass } from '../utils/bcryptPasswordUtlis.js';


const register = async (req, res) => {
    try {

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

const login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        };

        // Validate if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        };

        // Validate password
        const isPasswordValid = await comparePass(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        };

        // Generate token
        const token = generateToken(user);
        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while logging in the user." });
    }
}

const logout = async (req, res) => {
    try {

        // Clear the token cookie
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });

        // Redirect to homepage or login
        res.redirect("/");

    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).send("Error occurred during logout");
    }
}


export { register, login, logout };