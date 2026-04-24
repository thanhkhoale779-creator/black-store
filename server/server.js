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

// Phục vụ file tĩnh
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// Routes API
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'BLACK Store API running', timestamp: new Date().toISOString() });
});

// Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Kết nối database và tự động seed
const PORT = process.env.PORT || 5000;

connectDB()
    .then(async () => {
        const User = require('./models/User');
        const Product = require('./models/Product');

        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@black.store' });

        if (!adminExists) {
            console.log('🌱 Dang tao tai khoan admin...');
            const admin = await User.create({
                name: process.env.ADMIN_NAME || 'Admin',
                email: process.env.ADMIN_EMAIL || 'admin@black.store',
                password: process.env.ADMIN_PASSWORD || 'Admin@2026Black',
                role: 'admin'
            });

            console.log('📦 Dang tao san pham mau...');
            const sampleProducts = [
                {
                    name: 'Điện thoại Black Phone X Pro',
                    category: 'phone', categoryLabel: 'Điện thoại',
                    price: 29990000, oldPrice: 34990000, rating: 4.9, reviews: 128,
                    description: 'Điện thoại cao cấp với thiết kế nguyên khối, màn hình 6.7 inch AMOLED, chip Snapdragon 8 Gen 4, camera 108MP.',
                    badge: 'Mới', stockQuantity: 50, createdBy: admin._id
                },
                {
                    name: 'Laptop Black Book Air 15',
                    category: 'laptop', categoryLabel: 'Laptop',
                    price: 45990000, oldPrice: 49990000, rating: 4.8, reviews: 95,
                    description: 'Laptop siêu nhẹ 1.2kg, màn hình 15.6" 4K OLED, pin 20 giờ, chip Intel Core Ultra 9, RAM 32GB.',
                    badge: 'Hot', stockQuantity: 30, createdBy: admin._id
                },
                {
                    name: 'Tai nghe Black Pods Pro 2',
                    category: 'audio', categoryLabel: 'Âm thanh',
                    price: 5990000, oldPrice: 7490000, rating: 4.7, reviews: 256,
                    description: 'Tai nghe không dây chống ồn chủ động ANC, âm thanh Hi-Res Audio, pin 8 giờ.',
                    badge: null, stockQuantity: 200, createdBy: admin._id
                },
                {
                    name: 'Đồng hồ Black Watch Ultra',
                    category: 'watch', categoryLabel: 'Đồng hồ',
                    price: 18990000, oldPrice: null, rating: 4.9, reviews: 67,
                    description: 'Đồng hồ thông minh vỏ Titanium, màn hình Sapphire, đo ECG, SpO2, chống nước 100m.',
                    badge: 'Cao cấp', stockQuantity: 25, createdBy: admin._id
                },
                {
                    name: 'Điện thoại Black Phone S',
                    category: 'phone', categoryLabel: 'Điện thoại',
                    price: 21990000, oldPrice: 24990000, rating: 4.6, reviews: 189,
                    description: 'Điện thoại nhỏ gọn 6.1 inch, hiệu năng flagship, camera kép 50MP.',
                    badge: null, stockQuantity: 75, createdBy: admin._id
                }
            ];

            await Product.insertMany(sampleProducts);
            console.log(`✅ Da tao admin + ${sampleProducts.length} san pham mau`);
        }

        app.listen(PORT, () => {
            console.log(`🚀 BLACK Store: http://localhost:${PORT}`);
            console.log(`👑 Admin: http://localhost:${PORT}/admin`);
        });
    })
    .catch((err) => {
        console.error('❌ Loi ket noi database:', err.message);
        process.exit(1);
    });