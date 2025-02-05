const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');

// صفحه داشبورد ادمین
router.get('/dashboard', (req, res) => {
    res.render('adminDashboard');
});

// مسیرهای دیگر برای مدیریت کاربران، گزارش‌ها و تنظیمات
router.get('/users', protect, isAdmin, (req, res) => {
    res.send('Manage Users Page');
});

router.get('/reports', protect, isAdmin, (req, res) => {
    res.send('View Reports Page');
});

router.get('/settings', protect, isAdmin, (req, res) => {
    res.send('Admin Settings Page');
});

module.exports = router;