const API = '';
const token = localStorage.getItem('adminToken');

if (token) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadProducts();
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (data.success && data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        location.reload();
    } else {
        document.getElementById('loginMsg').textContent = 'Sai email/password hoặc không có quyền!';
    }
});

async function loadProducts() {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    const list = document.getElementById('productList');
    list.innerHTML = data.products.map(p => `
        <div class="product-item">
            <span>${p.name} - ${p.price.toLocaleString('vi-VN')}₫ - Tồn: ${p.stockQuantity}</span>
            <div>
                <button onclick="editProduct('${p._id}')">Sửa</button>
                <button onclick="deleteProduct('${p._id}')">Xóa</button>
            </div>
        </div>
    `).join('');
}

function showAddForm() {
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Thêm sản phẩm';
    document.getElementById('pId').value = '';
}

function hideForm() {
    document.getElementById('productForm').style.display = 'none';
}

async function saveProduct() {
    const id = document.getElementById('pId').value;
    const body = {
        name: document.getElementById('pName').value,
        category: document.getElementById('pCategory').value,
        categoryLabel: document.getElementById('pCategoryLabel').value,
        price: Number(document.getElementById('pPrice').value),
        oldPrice: Number(document.getElementById('pOldPrice').value) || null,
        stockQuantity: Number(document.getElementById('pStock').value),
        badge: document.getElementById('pBadge').value || null,
        description: document.getElementById('pDesc').value
    };
    
    const url = id ? `${API}/api/products/${id}` : `${API}/api/products`;
    const method = id ? 'PUT' : 'POST';
    
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
    });
    
    hideForm();
    loadProducts();
}

async function editProduct(id) {
    const res = await fetch(`${API}/api/products/${id}`);
    const data = await res.json();
    const p = data.product;
    
    document.getElementById('pId').value = p._id;
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pCategoryLabel').value = p.categoryLabel;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pOldPrice').value = p.oldPrice || '';
    document.getElementById('pStock').value = p.stockQuantity;
    document.getElementById('pBadge').value = p.badge || '';
    document.getElementById('pDesc').value = p.description;
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Sửa sản phẩm';
}

async function deleteProduct(id) {
    if (confirm('Xóa sản phẩm này?')) {
        await fetch(`${API}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadProducts();
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    location.reload();
}