
import express from 'express';
import isloggedin from '../middlewares/isLoggedInMiddleware.js';
const router = express.Router();



router.get('/dashboard', (req, res) => { // add is longgedin 
    res.render('dashboard');
})


export default router;