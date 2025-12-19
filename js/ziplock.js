// 自封袋材质对比功能

// 材质数据
const materialData = {
    pe: {
        name: 'PE材质',
        fullName: '聚乙烯',
        description: '聚乙烯材质是一种常用的塑料材料，具有良好的柔韧性和透明度，适用于一般包装需求。',
        features: [
            '透明度高，便于查看内容物',
            '柔韧性好，易于折叠和携带',
            '耐化学腐蚀，适用于多种物品包装',
            '价格经济实惠'
        ],
        specs: {
            thickness: '0.03mm - 0.15mm',
            temperature: '-40°C 至 80°C',
            strength: '中等',
            density: '0.92g/cm³',
            application: '食品包装、电子元件、日用品包装'
        }
    }
};

// 页面加载完成后初始化
(document.addEventListener('DOMContentLoaded', function() {
    initMaterialComparison();
}));

// 初始化材质对比功能
function initMaterialComparison() {
    const materialTabs = document.querySelectorAll('.material-tab');
    const materialDetails = document.getElementById('materialDetails');
    const materialSpecs = document.getElementById('materialSpecs');
    
    if (!materialTabs.length || !materialDetails || !materialSpecs) return;
    
    // 初始加载PE材质数据
    loadMaterialData('pe');
    
    // 添加材质选择事件监听
    materialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            materialTabs.forEach(t => t.classList.remove('active'));
            // 为当前标签添加active类
            this.classList.add('active');
            // 获取选中的材质
            const selectedMaterial = this.dataset.material;
            loadMaterialData(selectedMaterial);
        });
    });
}

// 加载材质数据
function loadMaterialData(materialType) {
    const material = materialData[materialType];
    if (!material) return;
    
    const materialDetails = document.getElementById('materialDetails');
    const materialSpecs = document.getElementById('materialSpecs');
    
    // 更新材质详情
    materialDetails.innerHTML = `
        <h3>${material.name} (${material.fullName})</h3>
        <p>${material.description}</p>
        <ul class="material-features">
            ${material.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // 更新材质规格
    materialSpecs.innerHTML = `
        <h3>技术规格</h3>
        <div class="specs-grid">
            <div class="spec-item">
                <span class="spec-label">厚度范围:</span>
                <span class="spec-value">${material.specs.thickness}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">耐温范围:</span>
                <span class="spec-value">${material.specs.temperature}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">机械强度:</span>
                <span class="spec-value">${material.specs.strength}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">密度:</span>
                <span class="spec-value">${material.specs.density}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">主要应用:</span>
                <span class="spec-value">${material.specs.application}</span>
            </div>
        </div>
    `;
    
    // 添加动画效果
    materialDetails.classList.add('fade-in');
    materialSpecs.classList.add('fade-in');
    
    // 移除动画类以便下次触发
    setTimeout(() => {
        materialDetails.classList.remove('fade-in');
        materialSpecs.classList.remove('fade-in');
    }, 500);
}

// 添加材质对比样式
function addComparisonStyles() {
    // 检查是否已经存在样式
    if (document.getElementById('comparison-styles')) return;
    
    // 创建样式元素
    const style = document.createElement('style');
    style.id = 'comparison-styles';
    style.textContent = `
        .comparison-tool {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        @media (min-width: 768px) {
            .comparison-tool {
                flex-direction: row;
                align-items: flex-start;
            }
        }
        
        .material-selector {
            flex: 1;
            min-width: 200px;
        }
        
        .material-select {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: white;
            cursor: pointer;
        }
        
        .material-info {
            flex: 3;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .material-details,
        .material-specs {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        }
        
        .material-features {
            list-style-type: disc;
            margin-left: 20px;
            margin-top: 10px;
        }
        
        .material-features li {
            margin-bottom: 5px;
            color: #666;
        }
        
        .specs-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        
        @media (min-width: 768px) {
            .specs-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        .spec-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .spec-label {
            font-weight: bold;
            color: #2A5CAA;
        }
        
        .spec-value {
            color: #666;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    // 添加到文档头部
    document.head.appendChild(style);
}

// 在页面加载时添加样式
addComparisonStyles();
