# 极简导航页

一个纯净、极简风格的个人导航页，支持快速部署到 GitHub Pages。

## ✨ 特性

- 🎨 **极简设计** - 简洁清爽的界面，专注于内容本身
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- 🌙 **深色模式** - 自动适配系统主题偏好
- ⚡ **轻量快速** - 纯静态页面，无需后端，加载速度极快
- 🚀 **易于部署** - 一键部署到 GitHub Pages

## 🚀 快速开始

### 方法一：直接使用

1. Fork 本仓库到你的 GitHub 账户
2. 进入仓库设置（Settings）
3. 找到 Pages 选项
4. 在 Source 下选择 `main` 分支
5. 点击 Save，等待部署完成
6. 访问 `https://你的用户名.github.io/仓库名/`

### 方法二：本地开发

```bash
# 克隆仓库
git clone https://github.com/你的用户名/仓库名.git

# 进入目录
cd 仓库名

# 使用任意静态服务器预览
# 例如使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve
```

然后在浏览器中访问 `http://localhost:8000`

## 📝 自定义

### 修改导航链接

编辑 `index.html` 文件，找到对应的导航分类，修改链接内容：

```html
<a href="https://example.com" target="_blank" class="nav-item">
    <span class="nav-icon">🔧</span>
    <span class="nav-title">网站名称</span>
    <span class="nav-desc">网站描述</span>
</a>
```

### 调整样式

编辑 `style.css` 文件，可以修改：

- 颜色主题（`:root` 变量）
- 卡片大小和间距
- 字体样式
- 动画效果

### 添加新分类

在 `index.html` 的 `<main>` 标签中添加新的 section：

```html
<section class="nav-section">
    <h2>新分类名称</h2>
    <div class="nav-grid">
        <!-- 添加导航项 -->
    </div>
</section>
```

## 📂 文件结构

```
.
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # JavaScript 脚本
├── .gitignore      # Git 忽略文件
└── README.md       # 说明文档
```

## 🎨 设计特点

- **极简主义** - 去除一切不必要的元素，只保留核心功能
- **视觉层次** - 清晰的信息架构，易于浏览和使用
- **微交互** - 精心设计的悬停效果和过渡动画
- **可访问性** - 支持键盘导航，符合无障碍标准

## 🌐 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 📄 许可证

MIT License - 随意使用和修改

## 💡 建议

- 定期更新链接，移除失效网站
- 根据个人需求调整分类和内容
- 可以添加搜索功能增强实用性
- 考虑添加网站图标（favicon）

---

使用 ❤️ 创建 | 2024
