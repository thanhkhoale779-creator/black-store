require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// API Routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'OK' });
});

// Fallback SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Connect DB & Start
const PORT = process.env.PORT || 5000;

connectDB()
    .then(async () => {
        const User = require('./models/User');
        const Product = require('./models/Product');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@black.store';
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            console.log('🌱 Creating admin...');
            const admin = await User.create({
                name: process.env.ADMIN_NAME || 'Admin',
                email: adminEmail,
                password: process.env.ADMIN_PASSWORD || 'Admin@2026Black',
                role: 'admin'
            });

            console.log('📦 Creating sample products...');
            await Product.insertMany([
                { name: 'Điện thoại Black Phone X Pro', category: 'phone', categoryLabel: 'Điện thoại', price: 29990000, oldPrice: 34990000, rating: 4.9, reviews: 128, description: 'Điện thoại cao cấp màn hình 6.7 inch AMOLED, chip Snapdragon 8 Gen 4, camera 108MP.', badge: 'Mới', stockQuantity: 50, createdBy: admin._id },
                { name: 'Laptop Black Book Air 15', category: 'laptop', categoryLabel: 'Laptop', price: 45990000, oldPrice: 49990000, rating: 4.8, reviews: 95, description: 'Laptop siêu nhẹ 1.2kg, màn hình 15.6 inch 4K OLED, pin 20 giờ.', badge: 'Hot', stockQuantity: 30, createdBy: admin._id },
                { name: 'Tai nghe Black Pods Pro 2', category: 'audio', categoryLabel: 'Âm thanh', price: 5990000, oldPrice: 7490000, rating: 4.7, reviews: 256, description: 'Tai nghe không dây chống ồn ANC, âm thanh Hi-Res.', badge: null, stockQuantity: 200, createdBy: admin._id },
                { name: 'Đồng hồ Black Watch Ultra', category: 'watch', categoryLabel: 'Đồng hồ', price: 18990000, oldPrice: null, rating: 4.9, reviews: 67, description: 'Đồng hồ thông minh vỏ Titanium, màn hình Sapphire.', badge: 'Cao cấp', stockQuantity: 25, createdBy: admin._id },
                { name: 'Điện thoại Black Phone S', category: 'phone', categoryLabel: 'Điện thoại', price: 21990000, oldPrice: 24990000, rating: 4.6, reviews: 189, description: 'Điện thoại nhỏ gọn 6.1 inch, camera kép 50MP.', badge: null, stockQuantity: 75, createdBy: admin._id }
            ]);
            console.log('✅ Admin + 5 products created!');
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ DB Error:', err.message);
        process.exit(1);
    });