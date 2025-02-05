const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController');

// نمایش صفحه Login
router.get('/login', (req, res) => {
    res.render('login'); // فایل login.ejs را رندر می‌کند
});

// نمایش صفحه Sign Up
router.get('/signup', (req, res) => {
    res.render('signup'); // فایل signup.ejs را رندر می‌کند
});

// مسیر ثبت‌نام
router.post('/signup', signUp);

// مسیر ورود
router.post('/login', login);

module.exports = router;