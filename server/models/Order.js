const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customerInfo: {
            fullName: {
                type: String,
                required: [true, 'Họ tên khách hàng là bắt buộc'],
                trim: true,
            },
            email: {
                type: String,
                required: [true, 'Email khách hàng là bắt buộc'],
                trim: true,
                lowercase: true,
            },
            phone: {
                type: String,
                required: [true, 'Số điện thoại là bắt buộc'],
                trim: true,
            },
            address: {
                type: String,
                required: [true, 'Địa chỉ là bắt buộc'],
                trim: true,
            },
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: String,
                price: Number,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                subtotal: Number,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: ['cod', 'banking', 'momo'],
            default: 'cod',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'refunded'],
            default: 'pending',
        },
        processedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Tính subtotal cho từng item trước khi lưu
orderSchema.pre('save', function (next) {
    this.items.forEach((item) => {
        item.subtotal = item.price * item.quantity;
    });
    next();
});

module.exports = mongoose.model('Order', orderSchema);