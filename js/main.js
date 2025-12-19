// 主JavaScript文件
// 导航菜单功能
document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单（移动端）
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 滚动监听：改变导航栏样式
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                // 如果是纯#，滚动到页面顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // 考虑固定导航栏的高度
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 搜索功能
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                // 简单的搜索实现，实际项目中会发送到服务器
                console.log('搜索关键词:', searchTerm);
                alert('搜索功能开发中，关键词：' + searchTerm);
            }
        });
    }
    
    // 加载更多按钮功能
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 模拟加载更多产品
            loadMoreProducts();
        });
    }
    

    
    // 初始化表单验证
    if (typeof initContactForm === 'function') {
        initContactForm();
    }
    
    // 化学兼容性矩阵交互
    initCompatibilityMatrix();
    
    // 为特定链接添加开发中弹窗
    const developmentLinks = document.querySelectorAll('a[href="solutions.html"], a[href="support.html"], a[href="#"][rel="nofollow"]');

    
    developmentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转行为
            if (confirm('正在开发中，确认保持当前窗口')) {
                // 用户点击确认，保持当前窗口
                return false;
            } else {
                // 用户点击取消，同样保持当前窗口
                return false;
            }
        });
    });
});

// 化学兼容性矩阵初始化
function initCompatibilityMatrix() {
    const tableRows = document.querySelectorAll('.compatibility-table tr');
    
    tableRows.forEach(row => {
        // 跳过表头
        if (row.querySelector('th')) return;
        
        row.addEventListener('click', function() {
            // 移除其他行的选中状态
            tableRows.forEach(r => r.classList.remove('selected'));
            // 添加当前行的选中状态
            this.classList.add('selected');
            
            // 获取材料信息
            const material = this.querySelector('td:first-child').textContent;
            // 模拟显示材料对比
            console.log('显示材料对比:', material);
            alert('材料对比功能开发中，材料：' + material);
        });
    });
}

// 成功提示弹窗功能
function showSuccessModal(message = '操作成功！') {
    // 创建模态框
    let modal = document.getElementById('successModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>成功</h3>
                <p id="modalMessage">${message}</p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // 更新消息
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) {
        modalMessage.textContent = message;
    }
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 关闭按钮
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 3秒后自动关闭
    setTimeout(function() {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }, 3000);
}

// XSS过滤功能
function sanitizeInput(input) {
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(input);
    }
    // 如果DOMPurify不可用，使用基本的HTML转义
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}