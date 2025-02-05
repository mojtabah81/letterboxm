const mongoose = require('mongoose');
const User = require('./models/User'); // مدل User را ایمپورت کنید
require('dotenv').config(); // برای متغیرهای محیطی (اتصال به پایگاه داده)

// اتصال به پایگاه داده
dbURI = 'mongodb+srv://mojtaba:13811121@network-eng.oayd0.mongodb.net/?retryWrites=true&w=majority&appName=network-eng'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// ایجاد کاربر ادمین
const createAdmin = async () => {
    try {
        // بررسی اینکه آیا ادمین قبلاً ایجاد شده است
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists:', existingAdmin);
            mongoose.connection.close();
            return;
        }

        // ایجاد کاربر ادمین جدید
        const admin = new User({
            email: 'admin@example.com', // ایمیل ادمین
            password: '123', // رمز عبور ادمین (می‌توانید آن را تغییر دهید)
            name: 'Admin User', // نام ادمین
            role: 'admin' // نقش ادمین
        });

        await admin.save();
        console.log('Admin user created successfully:', admin);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

// اجرای تابع ایجاد ادمین
createAdmin();