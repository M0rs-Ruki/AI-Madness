
import bcrypt from "bcrypt";

const hashPass = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        console.log(`Error Hashing Password ${err.message}`)
    }
}


const comparePass = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (err) {
        console.log(`Error Comparing Password ${err.message}`)
    }
}

export { hashPass, comparePass }