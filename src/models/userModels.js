
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/AIMADNESS');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);
export default User;