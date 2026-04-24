require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

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
        specifications: [
            { key: 'Màn hình', value: '6.7" AMOLED 120Hz' },
            { key: 'Chip', value: 'Snapdragon 8 Gen 4' },
            { key: 'RAM', value: '12GB' },
        ],
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
        specifications: [
            { key: 'Màn hình', value: '15.6" 4K OLED' },
            { key: 'CPU', value: 'Intel Core Ultra 9' },
            { key: 'RAM', value: '32GB LPDDR5' },
        ],
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
        specifications: [
            { key: 'Loại', value: 'True Wireless' },
            { key: 'Chống ồn', value: 'ANC chủ động' },
            { key: 'Pin', value: '8h + 24h case' },
        ],
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
        specifications: [
            { key: 'Chất liệu', value: 'Titanium' },
            { key: 'Màn hình', value: 'Sapphire Crystal' },
            { key: 'Pin', value: '5 ngày' },
        ],
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
        specifications: [
            { key: 'Màn hình', value: '6.1" AMOLED' },
            { key: 'Camera', value: '50MP + 12MP' },
            { key: 'Pin', value: '4000mAh' },
        ],
    },
    {
        name: 'Laptop Black Book Pro 16',
        category: 'laptop',
        categoryLabel: 'Laptop',
        price: 59990000,
        oldPrice: 64990000,
        description: 'Máy trạm di động màn hình 16" mini-LED, chip M4 Ultra, RAM 36GB, SSD 1TB, pin 22 giờ.',
        rating: 4.9,
        reviews: 43,
        badge: 'Pro',
        stockQuantity: 15,
        specifications: [
            { key: 'Màn hình', value: '16" mini-LED' },
            { key: 'Chip', value: 'M4 Ultra' },
            { key: 'RAM', value: '36GB' },
        ],
    },
    {
        name: 'Loa Black Sound Max',
        category: 'audio',
        categoryLabel: 'Âm thanh',
        price: 8990000,
        oldPrice: 10990000,
        description: 'Loa Bluetooth 360° spatial audio, chống nước IPX7, pin 24 giờ, kết nối WiFi & Bluetooth 5.3.',
        rating: 4.5,
        reviews: 178,
        badge: null,
        stockQuantity: 100,
        specifications: [
            { key: 'Âm thanh', value: '360° Spatial' },
            { key: 'Chống nước', value: 'IPX7' },
            { key: 'Pin', value: '24 giờ' },
        ],
    },
    {
        name: 'Đồng hồ Black Watch S',
        category: 'watch',
        categoryLabel: 'Đồng hồ',
        price: 9990000,
        oldPrice: 12990000,
        description: 'Đồng hồ thông minh thanh lịch, màn hình OLED luôn bật, theo dõi sức khỏe 24/7, GPS tích hợp.',
        rating: 4.7,
        reviews: 312,
        badge: 'Bán chạy',
        stockQuantity: 150,
        specifications: [
            { key: 'Màn hình', value: 'OLED Always-On' },
            { key: 'Sức khỏe', value: 'Tim, SpO2, Giấc ngủ' },
            { key: 'Pin', value: '3 ngày' },
        ],
    },
];

async function seedDatabase() {
    try {
        console.log('🌱 Bắt đầu seed database...\n');

        // Kết nối MongoDB
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI không được cấu hình trong .env');
        }

        await mongoose.connect(mongoURI);
        console.log('✅ Đã kết nối MongoDB Atlas\n');

        // Xóa dữ liệu cũ
        console.log('🗑️  Đang xóa dữ liệu cũ...');
        await Promise.all([
            User.deleteMany({}),
            Product.deleteMany({}),
        ]);
        console.log('✅ Đã xóa dữ liệu cũ\n');

        // Tạo tài khoản Admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@black.store';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026Black';
        const adminName = process.env.ADMIN_NAME || 'Quản trị viên';

        const admin = await User.create({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            phone: '1900123456',
        });

        console.log('👑 Tài khoản Admin đã được tạo:');
        console.log('   ┌─────────────────────────────────┐');
        console.log(`   │  Email:    ${adminEmail.padEnd(22)}│`);
        console.log(`   │  Password: ${adminPassword.padEnd(22)}│`);
        console.log('   └─────────────────────────────────┘\n');

        // Tạo sản phẩm mẫu
        const productsWithCreator = sampleProducts.map((p) => ({
            ...p,
            createdBy: admin._id,
        }));

        const createdProducts = await Product.insertMany(productsWithCreator);
        console.log(`📦 Đã tạo ${createdProducts.length} sản phẩm mẫu\n`);

        // Tổng kết
        console.log('═══════════════════════════════════════');
        console.log('  🎉 SEED DATABASE THÀNH CÔNG!');
        console.log('═══════════════════════════════════════');
        console.log(`  👤 Users:    1 (Admin)`);
        console.log(`  📦 Products: ${createdProducts.length}`);
        console.log('═══════════════════════════════════════\n');

        console.log('💡 Bạn có thể đăng nhập Admin Panel với:');
        console.log(`   Email:    ${adminEmail}`);
        console.log(`   Password: ${adminPassword}\n`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Lỗi seed database:', error.message);
        console.log('\n🔧 Cách khắc phục:');
        console.log('1. Kiểm tra file .env có MONGODB_URI hợp lệ không');
        console.log('2. Đảm bảo IP đã được whitelist trong MongoDB Atlas (0.0.0.0/0)');
        console.log('3. Kiểm tra username/password MongoDB có đúng không\n');
        process.exit(1);
    }
}

seedDatabase();