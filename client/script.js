// ============================================
// DATA - Danh sách sản phẩm mẫu
// ============================================
const products = [
    {
        id: 1,
        name: 'Điện thoại Black Phone X Pro',
        category: 'phone',
        categoryLabel: 'Điện thoại',
        price: 29990000,
        oldPrice: 34990000,
        rating: 4.9,
        reviews: 128,
        description: 'Điện thoại cao cấp với thiết kế nguyên khối, màn hình 6.7 inch AMOLED, chip xử lý mạnh mẽ nhất hiện nay, camera 108MP chụp đêm xuất sắc.',
        badge: 'Mới',
        inStock: true
    },
    {
        id: 2,
        name: 'Laptop Black Book Air 15',
        category: 'laptop',
        categoryLabel: 'Laptop',
        price: 45990000,
        oldPrice: 49990000,
        rating: 4.8,
        reviews: 95,
        description: 'Laptop siêu nhẹ chỉ 1.2kg, màn hình 15.6 inch 4K OLED, pin 20 giờ, hiệu năng đỉnh cao cho công việc sáng tạo.',
        badge: 'Hot',
        inStock: true
    },
    {
        id: 3,
        name: 'Tai nghe Black Pods Pro 2',
        category: 'audio',
        categoryLabel: 'Âm thanh',
        price: 5990000,
        oldPrice: 7490000,
        rating: 4.7,
        reviews: 256,
        description: 'Tai nghe không dây chống ồn chủ động, âm thanh Hi-Res, pin 8 giờ liên tục, sạc không dây MagSafe.',
        badge: null,
        inStock: true
    },
    {
        id: 4,
        name: 'Đồng hồ Black Watch Ultra',
        category: 'watch',
        categoryLabel: 'Đồng hồ',
        price: 18990000,
        oldPrice: null,
        rating: 4.9,
        reviews: 67,
        description: 'Đồng hồ thông minh cao cấp với vỏ titan, màn hình sapphire, đo ECG, SpO2, chống nước 100m.',
        badge: 'Cao cấp',
        inStock: true
    },
    {
        id: 5,
        name: 'Điện thoại Black Phone S',
        category: 'phone',
        categoryLabel: 'Điện thoại',
        price: 21990000,
        oldPrice: 24990000,
        rating: 4.6,
        reviews: 189,
        description: 'Điện thoại nhỏ gọn 6.1 inch, hiệu năng flagship, camera kép 50MP, thiết kế kính & kim loại sang trọng.',
        badge: null,
        inStock: true
    },
    {
        id: 6,
        name: 'Laptop Black Book Pro 16',
        category: 'laptop',
        categoryLabel: 'Laptop',
        price: 59990000,
        oldPrice: 64990000,
        rating: 4.9,
        reviews: 43,
        description: 'Máy trạm di động với chip M4 Ultra, RAM 32GB, ổ cứng 1TB, màn hình mini-LED 16 inch.',
        badge: 'Pro',
        inStock: true
    },
    {
        id: 7,
        name: 'Loa Black Sound Max',
        category: 'audio',
        categoryLabel: 'Âm thanh',
        price: 8990000,
        oldPrice: 10990000,
        rating: 4.5,
        reviews: 178,
        description: 'Loa bluetooth cao cấp 360°, âm thanh spatial audio, chống nước IPX7, pin 24 giờ.',
        badge: null,
        inStock: true
    },
    {
        id: 8,
        name: 'Đồng hồ Black Watch S',
        category: 'watch',
        categoryLabel: 'Đồng hồ',
        price: 9990000,
        oldPrice: 12990000,
        rating: 4.7,
        reviews: 312,
        description: 'Đồng hồ thông minh thanh lịch, màn hình OLED luôn bật, theo dõi sức khỏe toàn diện.',
        badge: 'Bán chạy',
        inStock: true
    },
    {
        id: 9,
        name: 'Tai nghe Black Studio Pro',
        category: 'audio',
        categoryLabel: 'Âm thanh',
        price: 12990000,
        oldPrice: null,
        rating: 4.8,
        reviews: 89,
        description: 'Tai nghe over-ear chuyên nghiệp, driver 50mm, dải tần 4Hz-40kHz, phù hợp studio.',
        badge: 'Mới',
        inStock: true
    },
    {
        id: 10,
        name: 'Sạc Black Power 65W',
        category: 'phone',
        categoryLabel: 'Phụ kiện',
        price: 1490000,
        oldPrice: 1990000,
        rating: 4.4,
        reviews: 456,
        description: 'Củ sạc GaN 65W siêu nhỏ gọn, sạc nhanh cho tất cả thiết bị, tương thích USB-C PD.',
        badge: null,
        inStock: true
    },
    {
        id: 11,
        name: 'Black Keyboard Pro',
        category: 'laptop',
        categoryLabel: 'Phụ kiện',
        price: 3490000,
        oldPrice: 3990000,
        rating: 4.6,
        reviews: 134,
        description: 'Bàn phím cơ không dây, switch Cherry MX, đèn nền RGB, pin 3 tháng, thiết kế tối giản.',
        badge: null,
        inStock: true
    },
    {
        id: 12,
        name: 'Black Display 27" 5K',
        category: 'laptop',
        categoryLabel: 'Màn hình',
        price: 36990000,
        oldPrice: null,
        rating: 4.9,
        reviews: 28,
        description: 'Màn hình 27 inch 5K Retina, 600 nits, P3 wide color, Thunderbolt 4, thiết kế không viền.',
        badge: 'Cao cấp',
        inStock: true
    }
];

// ============================================
// STATE
// ============================================
let cart = [];
let currentFilter = 'all';
let currentSearch = '';
let selectedProduct = null;

// ============================================
// DOM Elements
// ============================================
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');

// ============================================
// INITIALIZATION
// ============================================
function init() {
    renderProducts();
    updateCart();
    setupEventListeners();
    
    // Ẩn loading skeleton sau 1.5 giây
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1500);
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts() {
    let filtered = products;
    
    // Lọc theo danh mục
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    // Lọc theo tìm kiếm
    if (currentSearch) {
        const searchLower = currentSearch.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.categoryLabel.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }
    
    // Hiển thị empty state nếu không có kết quả
    if (filtered.length === 0) {
        productGrid.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        productGrid.innerHTML = filtered.map((product, index) => createProductCard(product, index)).join('');
    }
    
    // Gán sự kiện cho các nút trong card
    attachProductCardEvents();
}

function createProductCard(product, index) {
    const oldPriceHTML = product.oldPrice 
        ? `<span class="product-price-old">${formatPrice(product.oldPrice)}</span>` 
        : '';
    
    const badgeHTML = product.badge 
        ? `<span class="product-badge">${product.badge}</span>` 
        : '';
    
    // SVG placeholder khác nhau cho mỗi sản phẩm
    const svgColors = ['#333', '#444', '#3a3a3a', '#383838', '#404040', '#363636'];
    const bgColor = svgColors[index % svgColors.length];
    
    return `
        <div class="product-card" data-id="${product.id}" style="animation-delay: ${index * 0.05}s">
            <div class="product-image" style="background: ${bgColor};">
                ${badgeHTML}
                ${getCategorySVG(product.category)}
                <button class="product-quick-add" data-action="quick-add" data-id="${product.id}" title="Thêm vào giỏ">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.categoryLabel}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${truncateText(product.description, 60)}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">${formatPrice(product.price)}</span>
                        ${oldPriceHTML}
                    </div>
                    <span class="product-rating">★ ${product.rating} (${product.reviews})</span>
                </div>
            </div>
        </div>
    `;
}

function getCategorySVG(category) {
    const svgs = {
        phone: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1">
            <rect x="20" y="10" width="40" height="60" rx="6"/>
            <rect x="25" y="16" width="30" height="48" rx="2"/>
            <circle cx="40" cy="52" r="3"/>
        </svg>`,
        laptop: `<svg width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1">
            <rect x="15" y="8" width="70" height="48" rx="4"/>
            <rect x="20" y="14" width="60" height="36" rx="2"/>
            <path d="M5 60h90l-8 8H13l-8-8z"/>
        </svg>`,
        audio: `<svg width="70" height="80" viewBox="0 0 70 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1">
            <ellipse cx="35" cy="28" rx="20" ry="22"/>
            <rect x="28" y="38" width="14" height="28" rx="4"/>
            <circle cx="35" cy="48" r="8"/>
        </svg>`,
        watch: `<svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1">
            <rect x="12" y="16" width="36" height="48" rx="10"/>
            <rect x="16" y="24" width="28" height="32" rx="4"/>
            <path d="M20 10h20M20 70h20"/>
        </svg>`
    };
    return svgs[category] || svgs.phone;
}

function attachProductCardEvents() {
    // Click vào card để mở modal chi tiết
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Không mở modal nếu click vào nút quick-add
            if (e.target.closest('[data-action="quick-add"]')) return;
            const id = parseInt(card.dataset.id);
            openProductModal(id);
        });
    });
    
    // Nút quick-add
    document.querySelectorAll('[data-action="quick-add"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
            showToast('Đã thêm vào giỏ hàng');
        });
    });
}

// ============================================
// PRODUCT MODAL
// ============================================
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    selectedProduct = product;
    
    const oldPriceHTML = product.oldPrice 
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` 
        : '';
    
    const badgeHTML = product.badge 
        ? `<span class="product-badge">${product.badge}</span>` 
        : '';
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-product-image" style="background: var(--bg-primary); position: relative;">
            ${badgeHTML}
            ${getCategorySVG(product.category)}
        </div>
        <div class="modal-product-details">
            <span class="modal-product-category">${product.categoryLabel}</span>
            <h2 class="modal-product-name">${product.name}</h2>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-price">
                ${formatPrice(product.price)}
                ${oldPriceHTML}
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 14px;">
                <span>★ ${product.rating}</span>
                <span>(${product.reviews} đánh giá)</span>
                <span style="color: var(--success); margin-left: 8px;">✓ Còn hàng</span>
            </div>
            <div class="modal-actions">
                <button class="btn btn-white" id="modalAddToCart">Thêm vào giỏ</button>
                <button class="btn btn-outline" id="modalBuyNow">Mua ngay</button>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('active');
    
    // Gán sự kiện
    document.getElementById('modalAddToCart').addEventListener('click', () => {
        addToCart(product.id);
        showToast('Đã thêm vào giỏ hàng');
        closeProductModal();
    });
    
    document.getElementById('modalBuyNow').addEventListener('click', () => {
        addToCart(product.id);
        closeProductModal();
        openCartSidebar();
    });
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    selectedProduct = null;
}

// ============================================
// CART FUNCTIONS
// ============================================
function addToCart(productId, quantity = 1) {
    const existing = cart.find(item => item.productId === productId);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCart();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
    closeCartSidebar();
    showToast('Đã xóa giỏ hàng');
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    // Update cart count
    cartCount.textContent = totalItems;
    cartCount.classList.add('updated');
    setTimeout(() => cartCount.classList.remove('updated'), 400);
    
    // Update cart total
    cartTotal.textContent = formatPrice(totalPrice);
    
    // Render cart items
    renderCartItems();
    
    // Show/hide empty state & footer
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'flex';
    }
}

function renderCartItems() {
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        return `
            <div class="cart-item">
                <div class="cart-item-image" style="background: var(--bg-secondary);">
                    ${getCategorySVG(product.category).replace('width="80"', 'width="40"').replace('height="80"', 'height="40"')}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity - 1})">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${product.id})" title="Xóa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

// ============================================
// CART SIDEBAR
// ============================================
function openCartSidebar() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartSidebarOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartSidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// CHECKOUT
// ============================================
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Giỏ hàng trống');
        return;
    }
    
    const summaryHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return product ? `
            <div class="checkout-item">
                <span>${product.name} x${item.quantity}</span>
                <span>${formatPrice(product.price * item.quantity)}</span>
            </div>
        ` : '';
    }).join('');
    
    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    document.getElementById('checkoutSummary').innerHTML = `
        ${summaryHTML}
        <div class="checkout-summary-total">
            <span>Tổng cộng:</span>
            <span>${formatPrice(totalPrice)}</span>
        </div>
    `;
    
    document.getElementById('checkoutModal').classList.add('active');
    closeCartSidebar();
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    
    if (!fullName || !email || !phone || !address) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }
    
    // Đóng checkout modal
    document.getElementById('checkoutModal').classList.remove('active');
    
    // Hiển thị success modal
    document.getElementById('successModal').classList.add('active');
    
    // Xóa giỏ hàng
    cart = [];
    updateCart();
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.category;
            renderProducts();
        });
    });
    
    // Nav links
    document.querySelectorAll('.nav-link[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentFilter = link.dataset.category;
            renderProducts();
            scrollToProducts();
        });
    });
    
    // "Tất cả" nav link
    document.querySelector('.nav-link:not([data-category])')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = 'all';
        renderProducts();
        scrollToProducts();
    });
    
    // Search
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderProducts();
    });
    
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCartSidebar);
    
    // Cart sidebar close
    document.getElementById('cartSidebarClose').addEventListener('click', closeCartSidebar);
    document.getElementById('cartSidebarOverlay').addEventListener('click', closeCartSidebar);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    
    // Clear cart button
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    
    // Modal close buttons
    document.getElementById('modalClose').addEventListener('click', closeProductModal);
    document.getElementById('checkoutModalClose').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.remove('active');
    });
    document.getElementById('successClose').addEventListener('click', () => {
        document.getElementById('successModal').classList.remove('active');
    });
    
    // Close modals on overlay click
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProductModal();
    });
    document.getElementById('checkoutModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) document.getElementById('checkoutModal').classList.remove('active');
    });
    document.getElementById('successModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) document.getElementById('successModal').classList.remove('active');
    });
    
    // Checkout form submit
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
    
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCartSidebar();
            document.getElementById('checkoutModal').classList.remove('active');
            document.getElementById('successModal').classList.remove('active');
        }
    });
}

// ============================================
// START APP
// ============================================
init();