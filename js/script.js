// 导航页脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('导航页已加载');
    
    // 地图搜索功能
    const searchInput = document.getElementById('map-search');
    const searchBtn = document.getElementById('map-search-btn');
    const mapIframe = document.getElementById('google-map-iframe');
    
    if (searchBtn && searchInput && mapIframe) {
        // 点击搜索按钮
        searchBtn.addEventListener('click', function() {
            performMapSearch();
        });
        
        // 按 Enter 键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performMapSearch();
            }
        });
    }
    
    function performMapSearch() {
        const query = searchInput.value.trim();
        
        if (!query) {
            alert('请输入搜索内容');
            return;
        }
        
        // 更新 iframe 的 src，使用 Google Maps 嵌入 URL
        const encodedQuery = encodeURIComponent(query);
        const newSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedQuery}&zoom=14`;
        
        // 显示加载提示
        searchBtn.textContent = '搜索中...';
        searchBtn.disabled = true;
        
        // 更新地图
        mapIframe.src = newSrc;
        
        // 恢复按钮状态
        setTimeout(() => {
            searchBtn.textContent = '搜索';
            searchBtn.disabled = false;
        }, 1000);
    }
});
