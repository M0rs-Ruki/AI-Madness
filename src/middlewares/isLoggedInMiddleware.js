
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {log} from 'console';
import User from "../models/userModels.js";

dotenv.config({path: "./.env"});

const isloggedin = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User 
        .findById(decoded.id)
        .select("-password");
        req.user = user;
        next();

    } catch (error) {
        res.redirect('/login');
        console.log(err, 'Error in isLoggedIn');
    }
}


export default isloggedin;