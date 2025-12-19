// 自封袋材质对比工具

// 材质数据
const materialData = {
    pe: {
        name: "PE材质",
        fullName: "聚乙烯材质",
        description: "聚乙烯（PE）是一种热塑性树脂，具有良好的化学稳定性和电绝缘性。",
        characteristics: [
            "透明度高，柔韧性好",
            "化学稳定性好，耐腐蚀",
            "防水防潮性能优异",
            "易于加工和热封",
            "无毒无味，符合食品级标准"
        ],
        specs: {
            thickness: "0.03mm - 0.15mm",
            temperatureRange: "-40°C 至 80°C",
            loadCapacity: "0.5kg - 5kg",
            chemicalResistance: "耐弱酸、弱碱、有机溶剂",
            applications: "食品包装、电子元件、医药用品、日用品"
        },
        advantages: [
            "成本低，经济实惠",
            "透明度高，便于产品展示",
            "柔韧性好，不易破损",
            "防水防潮性能好"
        ],
        disadvantages: [
            "耐温性有限，不能用于高温环境",
            "硬度较低，容易被尖锐物体刺破"
        ]
    }
};

// 初始化材质对比工具
document.addEventListener('DOMContentLoaded', function() {
    initMaterialComparison();
});

// 初始化材质对比工具
function initMaterialComparison() {
    const materialSelect = document.getElementById('materialSelect');
    const materialDetails = document.getElementById('materialDetails');
    const materialSpecs = document.getElementById('materialSpecs');
    
    if (!materialSelect || !materialDetails || !materialSpecs) return;
    
    // 加载初始材质
    loadMaterialData('pe');
    
    // 添加材质选择事件
    materialSelect.addEventListener('change', function() {
        const selectedMaterial = this.value;
        loadMaterialData(selectedMaterial);
    });
}

// 加载材质数据
function loadMaterialData(materialType) {
    const material = materialData[materialType];
    if (!material) return;
    
    const materialDetails = document.getElementById('materialDetails');
    const materialSpecs = document.getElementById('materialSpecs');
    
    if (!materialDetails || !materialSpecs) return;
    
    // 渲染材质详情
    renderMaterialDetails(material, materialDetails);
    
    // 渲染材质规格
    renderMaterialSpecs(material, materialSpecs);
}

// 渲染材质详情
function renderMaterialDetails(material, container) {
    const html = `
        <h3>${material.name}</h3>
        <h4>${material.fullName}</h4>
        <p class="material-description">${material.description}</p>
        
        <div class="material-characteristics">
            <h5>主要特性</h5>
            <ul>
                ${material.characteristics.map(char => `<li>${char}</li>`).join('')}
            </ul>
        </div>
        
        <div class="material-pros-cons">
            <div class="pros">
                <h5>优点</h5>
                <ul>
                    ${material.advantages.map(adv => `<li>${adv}</li>`).join('')}
                </ul>
            </div>
            <div class="cons">
                <h5>缺点</h5>
                <ul>
                    ${material.disadvantages.map(dis => `<li>${dis}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// 渲染材质规格
function renderMaterialSpecs(material, container) {
    const html = `
        <h5>技术规格</h5>
        <div class="specs-grid">
            <div class="spec-item">
                <span class="spec-label">厚度范围</span>
                <span class="spec-value">${material.specs.thickness}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">温度范围</span>
                <span class="spec-value">${material.specs.temperatureRange}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">承重能力</span>
                <span class="spec-value">${material.specs.loadCapacity}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">化学耐受性</span>
                <span class="spec-value">${material.specs.chemicalResistance}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">应用领域</span>
                <span class="spec-value">${material.specs.applications}</span>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// 添加材质对比工具的样式
const style = document.createElement('style');
style.textContent = `
    .comparison-section {
        padding: 60px 0;
        background-color: #f9f9f9;
    }
    
    .comparison-tool {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .material-selector {
        flex: 0 0 200px;
        min-width: 200px;
    }
    
    .material-selector h3 {
        margin-bottom: 15px;
        color: #2A5CAA;
        font-size: 18px;
    }
    
    .material-select {
        width: 100%;
        padding: 12px;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        cursor: pointer;
        transition: border-color 0.3s ease;
    }
    
    .material-select:focus {
        outline: none;
        border-color: #2A5CAA;
        box-shadow: 0 0 0 2px rgba(42, 92, 170, 0.1);
    }
    
    .material-info {
        flex: 1;
        min-width: 300px;
    }
    
    .material-details {
        margin-bottom: 30px;
    }
    
    .material-details h3 {
        color: #2A5CAA;
        font-size: 24px;
        margin-bottom: 5px;
    }
    
    .material-details h4 {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 20px;
    }
    
    .material-description {
        color: #333;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
    }
    
    .material-characteristics h5,
    .material-pros-cons h5,
    .material-specs h5 {
        color: #333;
        font-size: 18px;
        margin-bottom: 15px;
        border-bottom: 2px solid #2A5CAA;
        padding-bottom: 8px;
        display: inline-block;
    }
    
    .material-characteristics ul {
        list-style-type: disc;
        padding-left: 20px;
        margin-bottom: 25px;
    }
    
    .material-characteristics li,
    .material-pros-cons li {
        color: #555;
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 8px;
    }
    
    .material-pros-cons {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
    }
    
    .material-pros-cons > div {
        flex: 1;
        min-width: 200px;
    }
    
    .pros h5 {
        color: #4CAF50;
        border-color: #4CAF50;
    }
    
    .cons h5 {
        color: #FF4D4D;
        border-color: #FF4D4D;
    }
    
    .material-specs {
        background-color: #f5f5f5;
        padding: 25px;
        border-radius: 8px;
    }
    
    .specs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .spec-item {
        display: flex;
        flex-direction: column;
    }
    
    .spec-label {
        color: #666;
        font-size: 14px;
        margin-bottom: 5px;
    }
    
    .spec-value {
        color: #333;
        font-size: 16px;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .comparison-tool {
            flex-direction: column;
        }
        
        .material-selector {
            width: 100%;
        }
        
        .material-pros-cons {
            flex-direction: column;
        }
        
        .specs-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);