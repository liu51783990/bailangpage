// 产品数据
const products = [
    {
        id: 1,
        name: "GL45瓶密封垫片",
        image: "images/GL451.JPEG",
        params: "耐温范围：-40°C 至 200°C，耐压：10bar",
        tags: ["GL45专用", "食品级", "ISO认证"],
        certification: "ISO 9001",
        category: "gl45"
    },
    {
        id: 2,
        name: "PTFE密封垫圈",
        image: "images/PTFE.jpeg",
        params: "耐温范围：-200°C 至 260°C，耐腐蚀",
        tags: ["PTFE材料", "化学工业", "高压"],
        certification: "ISO 9001",
        category: "other"
    },
    {
        id: 3,
        name: "硅胶密封件",
        image: "images/硅胶圈.png",
        params: "耐温范围：-60°C 至 220°C，弹性好",
        tags: ["硅胶", "食品级", "医药工业"],
        certification: "ISO 9001",
        category: "other"
    },
    {
        id: 4,
        name: "橡胶O型圈",
        image: "images/橡胶圈.jpeg",
        params: "耐温范围：-30°C 至 150°C，耐磨",
        tags: ["橡胶", "机械密封", "通用型"],
        certification: "ISO 9001",
        category: "other"
    },
    {        id: 7,        name: "PE自封袋",        image: "images/自封袋.jpeg",        params: "厚度：0.05mm，尺寸：100×150mm",        tags: ["PE材料", "食品级", "通用型"],        certification: "ISO 9001",        category: "ziplock"    }
];

// 当前加载的产品数量
let currentProductCount = 0;
// 每次加载的产品数量
const productsPerLoad = 3;

// 初始化产品展示
document.addEventListener('DOMContentLoaded', function() {
    loadInitialProducts();
    
    // 为加载更多按钮添加点击事件
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // 为分类标签添加点击事件
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 更新活动标签
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 获取选中的分类
            const category = this.dataset.category;
            
            // 根据分类筛选产品
            filterProductsByCategory(category);
        });
    });
});

// 加载初始产品
function loadInitialProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    // 清空产品网格
    productGrid.innerHTML = '';
    
    // 加载前3个产品
    loadProducts(0, productsPerLoad);
    currentProductCount = productsPerLoad;
}

// 加载更多产品
function loadMoreProducts() {
    // 获取当前选中的分类
    const activeTab = document.querySelector('.category-tab.active');
    const category = activeTab ? activeTab.dataset.category : 'all';
    
    // 根据分类获取产品
    const filteredProducts = category === 'all' ? 
        products : 
        products.filter(product => product.category === category);
    
    if (currentProductCount >= filteredProducts.length) {
        // 已加载所有产品，不再显示弹窗
        return;
    }
    
    const startIndex = currentProductCount;
    const endIndex = Math.min(startIndex + productsPerLoad, filteredProducts.length);
    
    // 加载更多产品
    for (let i = startIndex; i < endIndex; i++) {
        const productCard = createProductCard(filteredProducts[i]);
        document.getElementById('productGrid').appendChild(productCard);
    }
    
    currentProductCount = endIndex;
    
    // 如果已经加载完所有产品，隐藏加载更多按钮
    if (currentProductCount >= filteredProducts.length) {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// 加载指定范围的产品
function loadProducts(startIndex, endIndex) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    }
}

// 创建产品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    // 创建产品卡片HTML
    if (product.id === 1 && product.category === 'gl45') {
        card.innerHTML = `
            <a href="gl45.html">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
            <div class="product-info">
                    <a href="gl45.html"><h3>${product.name}</h3></a>
                    <p class="product-params">${product.params}</p>
                </div>
        `;
    } else if (product.id === 7 && product.category === 'ziplock') {
        card.innerHTML = `
            <a href="ziplock.html">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
            <div class="product-info">
                    <a href="ziplock.html"><h3>${product.name}</h3></a>
                    <p class="product-params">${product.params}</p>
                </div>
        `;
    } else {
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-params">${product.params}</p>
                </div>
        `;
        
        // 添加点击事件，加载产品详情
        card.addEventListener('click', function() {
            loadProductDetails(product.id);
        });
    }
    
    return card;
}

// 加载产品详情（模拟AJAX请求）
function loadProductDetails(productId) {
    // 查找产品
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // 模拟AJAX请求延迟
    console.log('加载产品详情:', product.name);
    
    // 实际项目中，这里会发送AJAX请求获取详细信息，并显示在模态框或新页面中
}

// 产品搜索功能
function searchProducts(keyword) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    return filteredProducts;
}

// 根据分类筛选产品
function filterProductsByCategory(category) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    // 清空产品网格
    productGrid.innerHTML = '';
    
    // 根据分类筛选产品
    const filteredProducts = category === 'all' ? 
        products : 
        products.filter(product => product.category === category);
    
    // 如果没有找到产品
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="no-products">该分类下暂无产品</p>';
        return;
    }
    
    // 加载筛选后的产品（每次加载3个）
    const productsToLoad = filteredProducts.slice(0, productsPerLoad);
    productsToLoad.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // 更新当前产品数量和加载更多按钮
    currentProductCount = productsToLoad.length;
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        if (currentProductCount >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// 导出产品数据，供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, searchProducts, filterProductsByCategory };
}