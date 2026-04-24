const mongoose = require('mongoose');

/**
 * Kết nối MongoDB Atlas (Cloud)
 * Không dùng localhost -> không tốn RAM máy bạn!
 */
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('❌ MONGODB_URI không được cấu hình trong .env');
            process.exit(1);
        }

        const conn = await mongoose.connect(mongoURI, {
            // MongoDB Atlas yêu cầu các options này
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`📦 Database: ${conn.connection.name}`);

        // Tạo indexes để tăng tốc tìm kiếm
        try {
            await conn.connection.db.collection('products').createIndex(
                { name: 'text', description: 'text', category: 'text' },
                { name: 'product_text_search' }
            );
            await conn.connection.db.collection('users').createIndex(
                { email: 1 },
                { unique: true, name: 'user_email_unique' }
            );
            await conn.connection.db.collection('orders').createIndex(
                { createdAt: -1, status: 1 },
                { name: 'order_status_date' }
            );
            console.log('✅ Database indexes created');
        } catch (indexError) {
            console.warn('⚠️ Index creation warning:', indexError.message);
        }

        // Xử lý sự kiện mất kết nối
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        console.log('\n💡 Hướng dẫn sửa lỗi:');
        console.log('1. Đăng ký MongoDB Atlas miễn phí: https://www.mongodb.com/cloud/atlas');
        console.log('2. Tạo Free Cluster (chọn M0 Sandbox)');
        console.log('3. Tạo Database User với password');
        console.log('4. Whitelist IP 0.0.0.0/0 (cho phép tất cả)');
        console.log('5. Copy connection string vào file .env');
        process.exit(1);
    }
};

module.exports = connectDB;