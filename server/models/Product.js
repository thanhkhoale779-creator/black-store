const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên sản phẩm là bắt buộc'],
            trim: true,
            maxlength: [200, 'Tên sản phẩm không quá 200 ký tự'],
        },
        category: {
            type: String,
            required: [true, 'Danh mục là bắt buộc'],
            enum: {
                values: ['phone', 'laptop', 'audio', 'watch', 'accessory'],
                message: 'Danh mục không hợp lệ',
            },
            lowercase: true,
        },
        categoryLabel: {
            type: String,
            required: [true, 'Nhãn danh mục là bắt buộc'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Giá sản phẩm là bắt buộc'],
            min: [0, 'Giá không được âm'],
        },
        oldPrice: {
            type: Number,
            default: null,
            min: [0, 'Giá cũ không được âm'],
        },
        description: {
            type: String,
            required: [true, 'Mô tả là bắt buộc'],
            maxlength: [3000, 'Mô tả không quá 3000 ký tự'],
        },
        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
        reviews: {
            type: Number,
            default: 0,
            min: 0,
        },
        badge: {
            type: String,
            default: null,
            enum: [null, 'Mới', 'Hot', 'Cao cấp', 'Pro', 'Bán chạy', 'Giảm giá'],
        },
        stockQuantity: {
            type: Number,
            required: [true, 'Số lượng tồn kho là bắt buộc'],
            min: [0, 'Số lượng không được âm'],
            default: 100,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        specifications: [
            {
                key: { type: String, trim: true },
                value: { type: String, trim: true },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual: Tính % giảm giá
productSchema.virtual('discountPercent').get(function () {
    if (this.oldPrice && this.oldPrice > this.price) {
        return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
    }
    return 0;
});

// Middleware: Tự động cập nhật inStock
productSchema.pre('save', function (next) {
    this.inStock = this.stockQuantity > 0;
    next();
});

// Middleware: Tự động set categoryLabel nếu chưa có
productSchema.pre('save', function (next) {
    if (!this.categoryLabel) {
        const labels = {
            phone: 'Điện thoại',
            laptop: 'Laptop',
            audio: 'Âm thanh',
            watch: 'Đồng hồ',
            accessory: 'Phụ kiện',
        };
        this.categoryLabel = labels[this.category] || this.category;
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);