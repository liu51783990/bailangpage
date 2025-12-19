// 耐压测试曲线图绘制功能

// 初始化耐压测试图表
function initPressureChart() {
    const chartElement = document.getElementById('pressureChart');
    if (!chartElement) return;
    
    // 获取SVG容器的尺寸
    const width = chartElement.clientWidth;
    const height = chartElement.clientHeight;
    
    // 设置SVG属性
    chartElement.setAttribute('width', width);
    chartElement.setAttribute('height', height);
    
    // 清除现有内容
    chartElement.innerHTML = '';
    
    // 定义图表的边界和内边距
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // 创建图表组
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    chartElement.appendChild(g);
    
    // 耐压测试数据（压力 vs 时间）
    const pressureData = [
        { time: 0, pressure: 0 },
        { time: 5, pressure: 2 },
        { time: 10, pressure: 4 },
        { time: 15, pressure: 6 },
        { time: 20, pressure: 8 },
        { time: 25, pressure: 10 },
        { time: 30, pressure: 12 },
        { time: 35, pressure: 14 },
        { time: 40, pressure: 15 },
        { time: 45, pressure: 15.5 },
        { time: 50, pressure: 15.8 },
        { time: 55, pressure: 16 },
        { time: 60, pressure: 16 } // 保持稳定
    ];
    
    // 计算数据范围
    const timeRange = [0, 60];
    const pressureRange = [0, 20];
    
    // 创建X轴比例尺
    const xScale = (time) => margin.left + (time / timeRange[1]) * chartWidth;
    
    // 创建Y轴比例尺
    const yScale = (pressure) => margin.top + chartHeight - (pressure / pressureRange[1]) * chartHeight;
    
    // 绘制X轴
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', margin.left);
    xAxis.setAttribute('y1', margin.top + chartHeight);
    xAxis.setAttribute('x2', margin.left + chartWidth);
    xAxis.setAttribute('y2', margin.top + chartHeight);
    xAxis.setAttribute('stroke', '#666666');
    xAxis.setAttribute('stroke-width', '2');
    chartElement.appendChild(xAxis);
    
    // 绘制Y轴
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', margin.left);
    yAxis.setAttribute('y1', margin.top);
    yAxis.setAttribute('x2', margin.left);
    yAxis.setAttribute('y2', margin.top + chartHeight);
    yAxis.setAttribute('stroke', '#666666');
    yAxis.setAttribute('stroke-width', '2');
    chartElement.appendChild(yAxis);
    
    // 绘制X轴刻度和标签
    for (let i = 0; i <= timeRange[1]; i += 10) {
        const x = xScale(i);
        
        // 刻度线
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', x);
        tick.setAttribute('y1', margin.top + chartHeight);
        tick.setAttribute('x2', x);
        tick.setAttribute('y2', margin.top + chartHeight + 5);
        tick.setAttribute('stroke', '#666666');
        tick.setAttribute('stroke-width', '1');
        chartElement.appendChild(tick);
        
        // 标签
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', margin.top + chartHeight + 20);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#666666');
        label.textContent = i + 's';
        chartElement.appendChild(label);
    }
    
    // 绘制Y轴刻度和标签
    for (let i = 0; i <= pressureRange[1]; i += 5) {
        const y = yScale(i);
        
        // 刻度线
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', margin.left - 5);
        tick.setAttribute('y1', y);
        tick.setAttribute('x2', margin.left);
        tick.setAttribute('y2', y);
        tick.setAttribute('stroke', '#666666');
        tick.setAttribute('stroke-width', '1');
        chartElement.appendChild(tick);
        
        // 标签
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', margin.left - 10);
        label.setAttribute('y', y + 5);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#666666');
        label.textContent = i + 'bar';
        chartElement.appendChild(label);
    }
    
    // 绘制曲线图
    let pathData = `M ${xScale(pressureData[0].time)} ${yScale(pressureData[0].pressure)}`;
    
    for (let i = 1; i < pressureData.length; i++) {
        pathData += ` L ${xScale(pressureData[i].time)} ${yScale(pressureData[i].pressure)}`;
    }
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#2A5CAA');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    chartElement.appendChild(path);
    
    // 添加数据点
    pressureData.forEach(data => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', xScale(data.time));
        circle.setAttribute('cy', yScale(data.pressure));
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#2A5CAA');
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '2');
        
        // 添加鼠标悬停效果
        circle.setAttribute('style', 'cursor: pointer; transition: r 0.2s ease;');
        circle.addEventListener('mouseover', function() {
            this.setAttribute('r', '6');
            showTooltip(chartElement, data.time, data.pressure, xScale(data.time), yScale(data.pressure));
        });
        circle.addEventListener('mouseout', function() {
            this.setAttribute('r', '4');
            hideTooltip();
        });
        
        chartElement.appendChild(circle);
    });
    
    // 添加标题
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', margin.top - 10);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#2A5CAA');
    title.textContent = '耐压测试曲线';
    chartElement.appendChild(title);
    
    // 添加X轴标题
    const xAxisTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xAxisTitle.setAttribute('x', margin.left + chartWidth / 2);
    xAxisTitle.setAttribute('y', height - 5);
    xAxisTitle.setAttribute('text-anchor', 'middle');
    xAxisTitle.setAttribute('font-size', '14');
    xAxisTitle.setAttribute('fill', '#666666');
    xAxisTitle.textContent = '时间 (秒)';
    chartElement.appendChild(xAxisTitle);
    
    // 添加Y轴标题
    const yAxisTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yAxisTitle.setAttribute('x', 15);
    yAxisTitle.setAttribute('y', height / 2);
    yAxisTitle.setAttribute('text-anchor', 'middle');
    yAxisTitle.setAttribute('font-size', '14');
    yAxisTitle.setAttribute('fill', '#666666');
    yAxisTitle.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
    yAxisTitle.textContent = '压力 (bar)';
    chartElement.appendChild(yAxisTitle);
}

// 显示数据点提示
function showTooltip(svgElement, time, pressure, x, y) {
    // 移除现有提示
    hideTooltip();
    
    // 创建提示元素
    const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tooltip.id = 'pressureTooltip';
    
    // 提示背景
    const tooltipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tooltipRect.setAttribute('x', x + 10);
    tooltipRect.setAttribute('y', y - 40);
    tooltipRect.setAttribute('width', 120);
    tooltipRect.setAttribute('height', 50);
    tooltipRect.setAttribute('rx', '5');
    tooltipRect.setAttribute('ry', '5');
    tooltipRect.setAttribute('fill', 'rgba(0, 0, 0, 0.8)');
    tooltipRect.setAttribute('stroke', '#2A5CAA');
    tooltipRect.setAttribute('stroke-width', '2');
    tooltip.appendChild(tooltipRect);
    
    // 时间文本
    const timeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    timeText.setAttribute('x', x + 20);
    timeText.setAttribute('y', y - 25);
    timeText.setAttribute('font-size', '14');
    timeText.setAttribute('fill', '#ffffff');
    timeText.textContent = `时间: ${time}s`;
    tooltip.appendChild(timeText);
    
    // 压力文本
    const pressureText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    pressureText.setAttribute('x', x + 20);
    pressureText.setAttribute('y', y - 5);
    pressureText.setAttribute('font-size', '14');
    pressureText.setAttribute('fill', '#ffffff');
    pressureText.textContent = `压力: ${pressure}bar`;
    tooltip.appendChild(pressureText);
    
    svgElement.appendChild(tooltip);
}

// 隐藏数据点提示
function hideTooltip() {
    const tooltip = document.getElementById('pressureTooltip');
    if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

// 窗口大小改变时重新绘制图表
window.addEventListener('resize', function() {
    initPressureChart();
});

// 化学兼容性矩阵功能

// 初始化化学兼容性矩阵
function initCompatibilityMatrix() {
    const tableContainer = document.querySelector('.compatibility-table');
    if (!tableContainer) return;
    
    // 化学兼容性数据
    const compatibilityData = [
        { material: 'PTFE', acid: 'A', alkali: 'A', solvent: 'A', oil: 'B', water: 'A' },
        { material: '硅胶', acid: 'B', alkali: 'B', solvent: 'C', oil: 'C', water: 'A' },
        { material: '丁腈橡胶', acid: 'C', alkali: 'B', solvent: 'B', oil: 'A', water: 'A' },
        { material: '氟橡胶', acid: 'A', alkali: 'A', solvent: 'B', oil: 'A', water: 'A' },
        { material: '乙丙橡胶', acid: 'B', alkali: 'A', solvent: 'C', oil: 'C', water: 'A' }
    ];
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'compatibility-matrix';
    
    // 创建表头
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // 添加材料列标题
    const materialHeader = document.createElement('th');
    materialHeader.textContent = '材料';
    headerRow.appendChild(materialHeader);
    
    // 添加化学物质列标题
    const chemicals = [
        { name: '酸', prop: 'acid' },
        { name: '碱', prop: 'alkali' },
        { name: '溶剂', prop: 'solvent' },
        { name: '油', prop: 'oil' },
        { name: '水', prop: 'water' }
    ];
    chemicals.forEach(chemical => {
        const th = document.createElement('th');
        th.textContent = chemical.name;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表体
    const tbody = document.createElement('tbody');
    
    compatibilityData.forEach(item => {
        const row = document.createElement('tr');
        
        // 添加材料名称
        const materialCell = document.createElement('td');
        materialCell.textContent = item.material;
        row.appendChild(materialCell);
        
        // 添加兼容性等级
        chemicals.forEach(chemical => {
            const cell = document.createElement('td');
            const compatibility = item[chemical.prop];
            
            // 设置兼容性等级样式
            let cellClass = '';
            let cellText = '';
            let cellColor = '';
            
            switch (compatibility) {
                case 'A':
                    cellClass = 'compatibility-a';
                    cellText = '优秀';
                    cellColor = '#4CAF50';
                    break;
                case 'B':
                    cellClass = 'compatibility-b';
                    cellText = '良好';
                    cellColor = '#FFC107';
                    break;
                case 'C':
                    cellClass = 'compatibility-c';
                    cellText = '一般';
                    cellColor = '#FF5722';
                    break;
                default:
                    cellClass = 'compatibility-d';
                    cellText = '不适用';
                    cellColor = '#9E9E9E';
            }
            
            cell.className = cellClass;
            cell.textContent = cellText;
            cell.style.backgroundColor = cellColor;
            cell.style.color = '#ffffff';
            cell.style.fontWeight = 'bold';
            cell.style.textAlign = 'center';
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // 清空容器并添加表格
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    
    // 添加表格样式
    addCompatibilityTableStyles();
}

// 添加化学兼容性表格样式
function addCompatibilityTableStyles() {
    // 检查是否已经存在样式
    if (document.getElementById('compatibility-styles')) return;
    
    // 创建样式元素
    const style = document.createElement('style');
    style.id = 'compatibility-styles';
    style.textContent = `
        .compatibility-matrix {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .compatibility-matrix th,
        .compatibility-matrix td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        
        .compatibility-matrix th {
            background-color: #2A5CAA;
            color: white;
            font-weight: bold;
        }
        
        .compatibility-matrix tr {
            transition: background-color 0.3s ease;
        }
        
        .compatibility-matrix tr:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
        
        .compatibility-matrix tr.selected {
            background-color: #e3f2fd;
        }
        
        .compatibility-a {
            background-color: #4CAF50 !important;
            color: white !important;
        }
        
        .compatibility-b {
            background-color: #FFC107 !important;
            color: white !important;
        }
        
        .compatibility-c {
            background-color: #FF5722 !important;
            color: white !important;
        }
        
        .compatibility-d {
            background-color: #9E9E9E !important;
            color: white !important;
        }
    `;
    
    // 添加到文档头部
    document.head.appendChild(style);
}

// 在页面加载完成后初始化所有图表和矩阵
document.addEventListener('DOMContentLoaded', function() {
    initPressureChart();
    initCompatibilityMatrix();
});