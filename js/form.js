// 表单验证和提交功能
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// 初始化联系表单
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // 添加实时验证
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // 文件上传验证
    const fileInput = contactForm.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            validateFile(this);
        });
    }
}

// 验证表单
function validateForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    // 清除所有错误信息
    clearAllErrors();
    
    // 验证每个必填字段
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // 验证文件（如果有）
    const fileInput = contactForm.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
        if (!validateFile(fileInput)) {
            isValid = false;
        }
    }
    
    return isValid;
}

// 验证单个字段
function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // 检查是否为空
    if (!value) {
        errorMessage = '此字段为必填项';
        isValid = false;
    } else {
        // 根据字段类型进行特定验证
        switch (input.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = '请输入有效的邮箱地址';
                    isValid = false;
                }
                break;
                
            case 'phone':
                // 中国大陆手机号验证
                const phoneRegex = /^1[3-9]\d{9}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = '请输入有效的手机号';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    errorMessage = '咨询内容至少10个字符';
                    isValid = false;
                }
                break;
        }
    }
    
    // 显示或隐藏错误信息
    if (!isValid) {
        showError(input, errorMessage);
    } else {
        hideError(input);
    }
    
    return isValid;
}

// 验证文件
function validateFile(fileInput) {
    const file = fileInput.files[0];
    if (!file) return true;
    
    // 清除之前的错误
    hideError(fileInput);
    
    // 验证文件类型
    const allowedTypes = ['.pdf', '.png'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
        showError(fileInput, '只允许上传PDF和PNG文件');
        return false;
    }
    
    // 验证文件大小（最大5MB）
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showError(fileInput, '文件大小不能超过5MB');
        return false;
    }
    
    return true;
}

// 显示错误信息
function showError(input, message) {
    // 移除现有的错误信息
    hideError(input);
    
    // 创建错误信息元素
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#FF4D4D';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    
    // 将错误信息添加到字段后面
    input.parentNode.appendChild(errorElement);
    
    // 添加错误样式到输入框
    input.style.borderColor = '#FF4D4D';
    input.style.boxShadow = '0 0 0 2px rgba(255, 77, 77, 0.2)';
}

// 隐藏错误信息
function hideError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
    
    // 恢复正常样式
    input.style.borderColor = '#E0E0E0';
    input.style.boxShadow = 'none';
}

// 清除所有错误信息
function clearAllErrors() {
    const contactForm = document.getElementById('contactForm');
    const errorMessages = contactForm.querySelectorAll('.error-message');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    errorMessages.forEach(error => {
        error.parentNode.removeChild(error);
    });
    
    formInputs.forEach(input => {
        input.style.borderColor = '#E0E0E0';
        input.style.boxShadow = 'none';
    });
}

// 提交表单（模拟AJAX请求）
function submitForm() {
    const contactForm = document.getElementById('contactForm');
    
    // 收集表单数据
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
        attachment: document.getElementById('attachment').files[0] || null
    };
    
    // 使用DOMPurify防止XSS攻击
    if (typeof DOMPurify !== 'undefined') {
        formData.name = DOMPurify.sanitize(formData.name);
        formData.email = DOMPurify.sanitize(formData.email);
        formData.phone = DOMPurify.sanitize(formData.phone);
        formData.message = DOMPurify.sanitize(formData.message);
    }
    
    // 禁用表单，防止重复提交
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    
    // 模拟AJAX请求
    setTimeout(() => {
        // 恢复表单
        submitBtn.disabled = false;
        submitBtn.textContent = '提交咨询';
        
        // 显示成功提示
        showSuccessModal('咨询提交成功！我们将尽快与您联系。', formData);
    }, 1500);
}

// 显示成功模态框
function showSuccessModal(message, formData) {
    // 检查是否已经存在模态框
    let modal = document.getElementById('successModal');
    if (!modal) {
        // 创建模态框元素
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>提交成功</h3>
                    <button class="close-btn" id="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="confirmModal">确定</button>
                </div>
            </div>
        `;
        
        // 添加模态框样式
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.5);
                animation: fadeIn 0.3s ease-in-out;
            }
            
            .modal-content {
                background-color: white;
                margin: auto;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                width: 90%;
                max-width: 500px;
                animation: slideIn 0.3s ease-in-out;
            }
            
            .modal-header {
                padding: 20px;
                background-color: #2A5CAA;
                color: white;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 20px;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .close-btn:hover {
                color: #E0E0E0;
            }
            
            .modal-body {
                padding: 20px;
                font-size: 16px;
                color: #666;
            }
            
            .modal-footer {
                padding: 20px;
                text-align: right;
                border-top: 1px solid #E0E0E0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyle);
        document.body.appendChild(modal);
        
        // 添加关闭事件
        const closeModal = document.getElementById('closeModal');
        const confirmModal = document.getElementById('confirmModal');
        
        const closeModalFunc = () => {
            modal.style.display = 'none';
        };
        
        closeModal.addEventListener('click', closeModalFunc);
        confirmModal.addEventListener('click', closeModalFunc);
        
        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }
    
    // 显示模态框
    modal.style.display = 'flex';
    
    // 获取表单元素
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
    
    // 模拟发送邮件通知管理员（实际项目中会有后端处理）
    if (formData) {
        console.log('发送邮件通知管理员:', formData);
    }
}

// 添加CSS样式以美化错误信息
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #FF4D4D;
        font-size: 14px;
        margin-top: 5px;
    }
    
    input:invalid, textarea:invalid {
        border-color: #FF4D4D;
        box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.2);
    }
    
    input:valid, textarea:valid {
        border-color: #4CAF50;
    }
`;
document.head.appendChild(style);