const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware bảo vệ route - Yêu cầu đăng nhập
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Lấy token từ Header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để truy cập',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Lấy user từ database (không lấy password)
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng không tồn tại',
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Tài khoản đã bị khóa',
            });
        }

        // Gán user vào request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn',
        });
    }
};

/**
 * Middleware phân quyền Admin
 */
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền Admin',
        });
    }
};

/**
 * Middleware phân quyền Staff trở lên
 */
const staff = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền thực hiện hành động này',
        });
    }
};

module.exports = { protect, admin, staff };