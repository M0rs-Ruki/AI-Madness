
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})


import { register } from '../controllers/authController.js';

router.post('/registerData', register);

export default router;