const jwt = require('jsonwebtoken');
const User = require('../models/User');

JWT_SECRET='e2b8f8e8d9c2f4d5a7e1b3c4a9f5e6d7b1c8e2a4f9d3b6c7e1f4a8b5d7c2e3f8a9d4b1e6c7f2b3a5c8d9f1e7b4'

// ایجاد توکن JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, // اطلاعاتی که در توکن ذخیره می‌شوند
        JWT_SECRET, // کلید مخفی
        { expiresIn: '1d' } // مدت اعتبار توکن
    );
};

const signUp = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        // بررسی وجود کاربر با ایمیل مشابه
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('<script>alert("User already exists"); window.location.href="/signup";</script>');
        }

        // ایجاد کاربر جدید
        const user = new User({ email, password, name, role });
        await user.save();

        // پس از موفقیت، کاربر را به صفحه Login هدایت کنید
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Server error. Please try again later."); window.location.href="/signup";</script>');
    }
};

// ورود کاربر
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // پیدا کردن کاربر با ایمیل
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).render('login', { message: 'User not found', success: false });
        }

        // بررسی رمز عبور
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).render('login', { message: 'Invalid credentials', success: false });
        }

        // ایجاد توکن (در صورت نیاز)
        const token = generateToken(user);

        // ذخیره توکن در کوکی (اختیاری)
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        // هدایت کاربر بر اساس نقش (role)
        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard'); // مسیر مدیریت برای ادمین
        } else {
            return res.redirect('/user/dashboard'); // مسیر کاربران عادی
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { message: 'Server error', success: false });
    }
};


module.exports = { signUp, login };