// 用车行程单生成器脚本

// DOM 元素
let generateBtn, resetBtn, copyBtn, copyBtnBottom, editBtn;
let resultSection, itineraryResult, toast;

// 表单字段
let carTypeRadios, travelDate, carTime, luggageCount;
let startLocation, endLocation, itineraryText, remarks, vehicleModel;
let customerName, passengerCount, contactPhone, orderNumber;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    generateBtn = document.getElementById('generate-btn');
    resetBtn = document.getElementById('reset-btn');
    copyBtn = document.getElementById('copy-btn');
    copyBtnBottom = document.getElementById('copy-btn-bottom');
    editBtn = document.getElementById('edit-btn');
    resultSection = document.getElementById('result-section');
    itineraryResult = document.getElementById('itinerary-result');
    toast = document.getElementById('toast');
    
    // 表单字段
    carTypeRadios = document.querySelectorAll('input[name="car-type"]');
    travelDate = document.getElementById('travel-date');
    carTime = document.getElementById('car-time');
    luggageCount = document.getElementById('luggage-count');
    startLocation = document.getElementById('start-location');
    endLocation = document.getElementById('end-location');
    itineraryText = document.getElementById('itinerary');
    remarks = document.getElementById('remarks');
    vehicleModel = document.getElementById('vehicle-model');
    customerName = document.getElementById('customer-name');
    passengerCount = document.getElementById('passenger-count');
    contactPhone = document.getElementById('contact-phone');
    orderNumber = document.getElementById('order-number');

    // 设置默认日期
    setDefaultDate();

    // 事件监听
    generateBtn.addEventListener('click', generateItinerary);
    resetBtn.addEventListener('click', resetForm);
    copyBtn.addEventListener('click', copyToClipboard);
    copyBtnBottom.addEventListener('click', copyToClipboard);
    editBtn.addEventListener('click', () => {
        resultSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 设置默认日期
function setDefaultDate() {
    const today = new Date();
    travelDate.valueAsDate = today;
}

// 获取选中的用车属性
function getSelectedCarType() {
    for (let radio of carTypeRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return '';
}

// 生成行程单
function generateItinerary() {
    // 验证必填字段
    const carType = getSelectedCarType();
    
    if (!travelDate.value) {
        showToast('请选择出行日期');
        travelDate.focus();
        return;
    }
    
    if (!startLocation.value.trim()) {
        showToast('请填写出行酒店或机场');
        startLocation.focus();
        return;
    }
    
    if (!endLocation.value.trim()) {
        showToast('请填写结束酒店或机场');
        endLocation.focus();
        return;
    }
    
    if (!vehicleModel.value.trim()) {
        showToast('请填写车辆车型');
        vehicleModel.focus();
        return;
    }
    
    if (!customerName.value.trim()) {
        showToast('请填写客户姓名');
        customerName.focus();
        return;
    }
    
    if (!passengerCount.value) {
        showToast('请填写出行人数');
        passengerCount.focus();
        return;
    }
    
    if (!contactPhone.value.trim()) {
        showToast('请填写联系方式');
        contactPhone.focus();
        return;
    }
    
    if (!orderNumber.value.trim()) {
        showToast('请填写行程编号');
        orderNumber.focus();
        return;
    }

    // 构建行程单内容
    const itineraryContent = generateItineraryContent();

    // 显示结果
    itineraryResult.innerHTML = formatItinerary(itineraryContent);
    resultSection.style.display = 'block';
    
    // 滚动到结果区域
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// 生成行程单内容
function generateItineraryContent() {
    const carType = getSelectedCarType();
    const date = formatDate(travelDate.value);
    const time = carTime.value || '待定';
    const luggage = luggageCount.value ? `${luggageCount.value} 件` : '无';
    
    // 处理游玩行程：将多行转换为一行，用 -> 分隔
    let itinerary = itineraryText.value.trim() || '无特殊安排';
    if (itinerary !== '无特殊安排') {
        itinerary = itinerary.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join(' -> ');
    }
    
    const remarksText = remarks.value.trim();
    
    let content = `【行程编号】${orderNumber.value}

用车属性：${carType}
出行日期：${date}
用车时间：${time}
行李数量：${luggage}
出发地点：${startLocation.value}
结束地点：${endLocation.value}
车辆车型：${vehicleModel.value}

客户姓名：${customerName.value}
出行人数：${passengerCount.value} 人
联系方式：${contactPhone.value}

游玩行程：${itinerary}`;

    // 如果有备注，添加到最后
    if (remarksText) {
        content += `\n备注：${remarksText}`;
    }

    return content;
}

// 格式化行程单显示
function formatItinerary(content) {
    // 去除开头和结尾的空白字符
    content = content.trim();
    
    // 创建一个 div 来安全地处理文本
    const div = document.createElement('div');
    div.textContent = content;
    
    // 获取处理后的 HTML
    let html = div.innerHTML;
    
    // 替换换行符为 <br>
    html = html.replace(/\n/g, '<br>');
    
    // 高亮标题行
    html = html.replace(/(用车行程单|用车信息|客户信息|游玩行程|备注)(<br>|$)/g, 
        '<div class="itinerary-title">$1</div>$2');
    
    // 高亮行程编号
    html = html.replace(/【([^】]+)】/g, 
        '<strong class="order-number">【$1】</strong>');
    
    // 高亮字段名（冒号前面的部分）
    html = html.replace(/^([^：<\n]+)：/gm, 
        '<span class="field-label">$1：</span>');
    
    return html;
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// 复制到剪贴板
async function copyToClipboard() {
    try {
        // 获取纯文本内容
        const textContent = itineraryResult.innerText || itineraryResult.textContent;
        
        // 使用 Clipboard API
        await navigator.clipboard.writeText(textContent);
        showToast('✅ 已复制到剪贴板！');
    } catch (err) {
        // 降级方案
        try {
            const textArea = document.createElement('textarea');
            textArea.value = itineraryResult.innerText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('✅ 已复制到剪贴板！');
        } catch (err2) {
            showToast('❌ 复制失败，请手动复制');
        }
    }
}

// 重置表单
function resetForm() {
    // 重置用车属性为包车
    carTypeRadios[0].checked = true;
    
    // 重置日期
    setDefaultDate();
    
    // 清空其他字段
    carTime.value = '';
    luggageCount.value = '';
    startLocation.value = '';
    endLocation.value = '';
    itineraryText.value = '';
    remarks.value = '';
    vehicleModel.value = '';
    customerName.value = '';
    passengerCount.value = '';
    contactPhone.value = '';
    orderNumber.value = '';
    
    // 隐藏结果
    resultSection.style.display = 'none';
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('已重置表单');
}

// 显示提示消息
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
