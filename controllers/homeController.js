const Movie = require('../models/Movie'); // مدل Movie

// کنترلر برای دریافت داده‌های صفحه اصلی
const getHomePageContent = async (req, res) => {
    try {
        // 1. دریافت فیلم‌های ویژه (Featured Movies)
        const featuredMovies = await Movie.find({ featured: true })
            .limit(5)
            .select('title poster description _id');

        // 2. دریافت فیلم‌های پرطرفدار (Top Rated Movies)
        const topRatedMovies = await Movie.find()
            .sort({ averageRating: -1 }) // مرتب‌سازی بر اساس امتیاز به صورت نزولی
            .limit(10)
            .select('title poster averageRating _id');

        // 3. دریافت جدیدترین فیلم‌ها (Newest Movies)
        const newestMovies = await Movie.find()
            .sort({ createdAt: -1 }) // مرتب‌سازی بر اساس تاریخ ایجاد به صورت نزولی
            .limit(10)
            .select('title poster year _id');

        // 4. دریافت پربازدیدترین فیلم‌ها (Trending Movies)
        const trendingMovies = await Movie.find()
            .sort({ viewCount: -1 }) // مرتب‌سازی بر اساس تعداد بازدید به صورت نزولی
            .limit(10)
            .select('title poster viewCount _id');

        // 5. دریافت ژانرهای محبوب (Popular Genres)
        const popularGenres = await Movie.aggregate([
            { $unwind: "$genre" }, // باز کردن آرایه ژانرها
            { $group: { _id: "$genre", count: { $sum: 1 } } }, // گروه‌بندی بر اساس ژانر و شمارش تعداد فیلم‌ها
            { $sort: { count: -1 } }, // مرتب‌سازی بر اساس تعداد به صورت نزولی
            { $limit: 5 } // محدود کردن به 5 ژانر محبوب
        ]);

        // ارسال داده‌ها به فایل EJS
        res.render('index', {
            featuredMovies,
            topRatedMovies,
            newestMovies,
            trendingMovies,
            popularGenres
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getHomePageContent };