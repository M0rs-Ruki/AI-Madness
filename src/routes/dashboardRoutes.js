
import express from 'express';
import isloggedin from '../middlewares/isLoggedInMiddleware.js';
const router = express.Router();



router.get('/dashboard', isloggedin, (req, res) => {
    res.render('dashboard');
})



export default router;