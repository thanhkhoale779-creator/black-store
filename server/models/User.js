const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên là bắt buộc'],
            trim: true,
            maxlength: [100, 'Tên không quá 100 ký tự'],
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Email không hợp lệ',
            ],
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc'],
            minlength: [6, 'Mật khẩu ít nhất 6 ký tự'],
            select: false, // Không trả về password khi query
        },
        role: {
            type: String,
            enum: ['admin', 'staff', 'customer'],
            default: 'customer',
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method so sánh password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method kiểm tra quyền admin
userSchema.methods.isAdmin = function () {
    return this.role === 'admin';
};

// Method kiểm tra quyền staff
userSchema.methods.isStaff = function () {
    return this.role === 'admin' || this.role === 'staff';
};

module.exports = mongoose.model('User', userSchema);