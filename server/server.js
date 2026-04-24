require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
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

// Khởi tạo Express app
const app = express();

// ============================================
// KẾT NỐI DATABASE (MongoDB Atlas - Cloud)
// ============================================
connectDB();

// ============================================
// MIDDLEWARE
// ============================================

// Bảo mật HTTP headers
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

// CORS - Cho phép truy cập từ mọi nguồn
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Nén response để tăng tốc
app.use(compression());

// Log request
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// Parse JSON body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// PHỤC VỤ FILE TĨNH (Frontend)
// ============================================

// Client (Website người dùng)
app.use(express.static(path.join(__dirname, '..', 'client'), {
    maxAge: '1d',
    etag: true,
}));

// Admin Panel
app.use('/admin', express.static(path.join(__dirname, '..', 'admin'), {
    maxAge: '1d',
    etag: true,
}));

// ============================================
// API ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'BLACK Store API đang hoạt động',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// ============================================
// FALLBACK ROUTES
// ============================================

// Admin Panel - Fallback
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin', 'index.html'));
});

// Website - Fallback (cho SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route không tồn tại',
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: 'Dữ liệu không hợp lệ',
            errors: messages,
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Dữ liệu đã tồn tại',
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ',
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token đã hết hạn',
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Lỗi server',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

// ============================================
// KHỞI ĐỘNG SERVER
// ============================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log('┌─────────────────────────────────────────┐');
    console.log('│         🖤 BLACK STORE SERVER           │');
    console.log('├─────────────────────────────────────────┤');
    console.log(`│  🚀 Server:  http://localhost:${PORT}       │`);
    console.log(`│  📦 API:     http://localhost:${PORT}/api   │`);
    console.log(`│  👑 Admin:   http://localhost:${PORT}/admin │`);
    console.log(`│  🌍 Mode:    ${(process.env.NODE_ENV || 'development').padEnd(27)}│`);
    console.log('└─────────────────────────────────────────┘');
});

// Xử lý tắt server an toàn
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Đóng server...');
    server.close(() => {
        console.log('✅ Server đã đóng');
        process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

module.exports = app;