const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const { customerInfo, items } = req.body;
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).json({ success: false, message: 'Khong tim thay san pham' });
            orderItems.push({ product: product._id, name: product.name, price: product.price, quantity: item.quantity });
            totalAmount += product.price * item.quantity;
        }
        const order = await Order.create({ customerInfo, items: orderItems, totalAmount });
        res.status(201).json({ success: true, message: 'Dat hang thanh cong!', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;