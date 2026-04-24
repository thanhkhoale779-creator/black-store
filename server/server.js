require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const connectDB = require('./config/db');

// Import Routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// Routes API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

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
        // Tự động tạo admin nếu chưa có
        const User = require('./models/User');
        const Product = require('./models/Product');

        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@black.store' });
        
        if (!adminExists) {
            console.log('🌱 Đang tạo tài khoản admin...');
            const admin = await User.create({
                name: process.env.ADMIN_NAME || 'Admin',
                email: process.env.ADMIN_EMAIL || 'admin@black.store',
                password: process.env.ADMIN_PASSWORD || 'Admin@2026Black',
                role: 'admin'
            });

            // Tạo sản phẩm mẫu
            console.log('📦 Đang tạo sản phẩm mẫu...');
            const sampleProducts = [
                {
                    name: 'Điện thoại Black Phone X Pro',
                    category: 'phone',
                    categoryLabel: 'Điện thoại',
                    price: 29990000,
                    oldPrice: 34990000,
                    description: 'Điện thoại cao cấp với thiết kế nguyên khối, màn hình 6.7 inch AMOLED, chip Snapdragon 8 Gen 4, camera 108MP chụp đêm xuất sắc, pin 5000mAh.',
                    rating: 4.9,
                    reviews: 128,
                    badge: 'Mới',
                    stockQuantity: 50,
                    createdBy: admin._id
                },
                {
                    name: 'Laptop Black Book Air 15',
                    category: 'laptop',
                    categoryLabel: 'Laptop',
                    price: 45990000,
                    oldPrice: 49990000,
                    description: 'Laptop siêu nhẹ 1.2kg, màn hình 15.6" 4K OLED, pin 20 giờ, chip Intel Core Ultra 9, RAM 32GB.',
                    rating: 4.8,
                    reviews: 95,
                    badge: 'Hot',
                    stockQuantity: 30,
                    createdBy: admin._id
                },
                {
                    name: 'Tai nghe Black Pods Pro 2',
                    category: 'audio',
                    categoryLabel: 'Âm thanh',
                    price: 5990000,
                    oldPrice: 7490000,
                    description: 'Tai nghe không dây chống ồn chủ động ANC, âm thanh Hi-Res Audio, pin 8 giờ, sạc không dây MagSafe.',
                    rating: 4.7,
                    reviews: 256,
                    badge: null,
                    stockQuantity: 200,
                    createdBy: admin._id
                },
                {
                    name: 'Đồng hồ Black Watch Ultra',
                    category: 'watch',
                    categoryLabel: 'Đồng hồ',
                    price: 18990000,
                    oldPrice: null,
                    description: 'Đồng hồ thông minh vỏ Titanium, màn hình Sapphire, đo ECG, SpO2, GPS đa băng tần, chống nước 100m.',
                    rating: 4.9,
                    reviews: 67,
                    badge: 'Cao cấp',
                    stockQuantity: 25,
                    createdBy: admin._id
                },
                {
                    name: 'Điện thoại Black Phone S',
                    category: 'phone',
                    categoryLabel: 'Điện thoại',
                    price: 21990000,
                    oldPrice: 24990000,
                    description: 'Điện thoại nhỏ gọn 6.1 inch, hiệu năng flagship, camera kép 50MP, thiết kế kính & kim loại.',
                    rating: 4.6,
                    reviews: 189,
                    badge: null,
                    stockQuantity: 75,
                    createdBy: admin._id
                }
            ];

            await Product.insertMany(sampleProducts);
            console.log(`✅ Đã tạo ${sampleProducts.length} sản phẩm mẫu`);
        }

        // Khởi động server
        app.listen(PORT, () => {
            console.log('┌─────────────────────────────────────────┐');
            console.log('│         🖤 BLACK STORE SERVER           │');
            console.log('├─────────────────────────────────────────┤');
            console.log(`│  🚀 Server:  http://localhost:${PORT}       │`);
            console.log(`│  👑 Admin:   http://localhost:${PORT}/admin │`);
            console.log('└─────────────────────────────────────────┘');
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to database:', err.message);
        process.exit(1);
    });