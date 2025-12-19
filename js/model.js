// GL45瓶密封3D模型查看器

// 全局变量
let scene, camera, renderer, controls, bottle, seal, isAutoRotating = false;

// 初始化3D模型查看器
document.addEventListener('DOMContentLoaded', function() {
    initModelViewer();
    addModelControls();
});

// 初始化3D场景
function initModelViewer() {
    const modelViewer = document.getElementById('modelViewer');
    if (!modelViewer) return;
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, modelViewer.clientWidth / modelViewer.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    modelViewer.appendChild(renderer.domElement);
    
    // 添加轨道控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x2A5CAA, 0.5);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);
    
    // 创建GL45瓶模型
    createBottleModel();
    
    // 创建密封垫片模型
    createSealModel();
    
    // 添加网格辅助线
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // 开始动画循环
    animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

// 创建GL45瓶模型
function createBottleModel() {
    // 创建瓶身
    const bottleGeometry = new THREE.CylinderGeometry(1, 1.2, 3, 32);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        metalness: 0.1, 
        roughness: 0.3,
        transparent: true,
        opacity: 0.9
    });
    bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottle.position.y = 0;
    scene.add(bottle);
    
    // 创建瓶颈
    const neckGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 32);
    const neckMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        metalness: 0.1, 
        roughness: 0.3
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = 2;
    scene.add(neck);
    
    // 创建瓶口螺纹（简化表示）
    const threadGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32);
    const threadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc, 
        metalness: 0.5, 
        roughness: 0.3
    });
    const thread = new THREE.Mesh(threadGeometry, threadMaterial);
    thread.position.y = 2.8;
    scene.add(thread);
}

// 创建密封垫片模型
function createSealModel() {
    const sealGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const sealMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2A5CAA, 
        metalness: 0.1, 
        roughness: 0.8
    });
    seal = new THREE.Mesh(sealGeometry, sealMaterial);
    seal.position.y = 2.75;
    scene.add(seal);
    
    // 创建密封内层
    const innerSealGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 32);
    const innerSealMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e4a8a, 
        metalness: 0.1, 
        roughness: 0.9
    });
    const innerSeal = new THREE.Mesh(innerSealGeometry, innerSealMaterial);
    innerSeal.position.y = 2.75;
    scene.add(innerSeal);
}

// 添加模型控制按钮功能
function addModelControls() {
    const rotateBtn = document.getElementById('rotateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', function() {
            isAutoRotating = !isAutoRotating;
            this.textContent = isAutoRotating ? '停止旋转' : '自动旋转';
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetCameraPosition();
        });
    }
}

// 重置相机位置
function resetCameraPosition() {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    controls.update();
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 自动旋转
    if (isAutoRotating) {
        scene.rotation.y += 0.005;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// 响应窗口大小变化
function onWindowResize() {
    const modelViewer = document.getElementById('modelViewer');
    if (!modelViewer) return;
    
    camera.aspect = modelViewer.clientWidth / modelViewer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
}

// 销毁模型查看器（清理资源）
function disposeModelViewer() {
    window.removeEventListener('resize', onWindowResize);
    
    if (controls) {
        controls.dispose();
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    const modelViewer = document.getElementById('modelViewer');
    if (modelViewer && modelViewer.children.length > 0) {
        modelViewer.removeChild(modelViewer.firstChild);
    }
}