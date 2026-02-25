# KWM 艺术中心网站 - 部署指南

## 🚀 方式一：使用 Vercel 部署（推荐）

### 1️⃣ 推送代码到 GitHub

创建 GitHub 仓库后，运行以下命令：

```bash
# 替换为你的 GitHub 用户名和仓库名
git remote add origin https://github.com/YOUR_USERNAME/kwa_website.git
git branch -M main
git push -u origin main
```

### 2️⃣ 部署到 Vercel

1. 访问 https://vercel.com/signup
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择你刚创建的 GitHub 仓库 `kwa_website`
5. Vercel 会自动检测到 Next.js 项目
6. 配置环境变量（如果需要 Sanity CMS）：
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
7. 点击 "Deploy"

**部署完成！** Vercel 会给你一个免费的域名，例如：
`https://kwa-website.vercel.app`

### 3️⃣ 自定义域名（可选）

在 Vercel 项目设置中：
1. 进入 Settings → Domains
2. 添加你的域名（如 `www.kwmartcenter.com`）
3. 按照指示配置 DNS 记录

---

## 🌐 方式二：使用 Netlify 部署

1. 访问 https://netlify.com
2. 使用 GitHub 登录
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
6. 添加环境变量（如果需要）
7. 点击 "Deploy site"

---

## 🖥️ 方式三：自己服务器部署

### 要求
- Node.js 18+
- npm 或 yarn
- PM2（进程管理）

### 步骤

1. **在服务器上克隆代码**：
```bash
git clone https://github.com/YOUR_USERNAME/kwa_website.git
cd kwa_website
```

2. **安装依赖**：
```bash
npm install
```

3. **创建环境变量文件**：
```bash
cp .env.local.example .env.local
# 编辑 .env.local 填入实际值
```

4. **构建项目**：
```bash
npm run build
```

5. **使用 PM2 运行**：
```bash
npm install -g pm2
pm2 start npm --name "kwm-website" -- start
pm2 save
pm2 startup
```

6. **配置 Nginx 反向代理**：
```nginx
server {
    listen 80;
    server_name kwmartcenter.com www.kwmartcenter.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **配置 SSL（使用 Let's Encrypt）**：
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d kwmartcenter.com -d www.kwmartcenter.com
```

---

## ⚙️ 环境变量说明

目前网站使用 mock data，可以直接部署。

如果将来要连接 Sanity CMS，需要设置：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token（可选）
```

---

## 📊 部署后检查清单

- [ ] 网站可以访问（中文和英文版本）
- [ ] 所有页面正常加载（首页、展览、新闻、团队、关于、联系）
- [ ] 图片正常显示
- [ ] 语言切换功能正常
- [ ] 展览筛选功能正常
- [ ] 移动端显示正常
- [ ] SEO 元标签正确
- [ ] 404 页面正常

---

## 🔄 后续更新

### 通过 Git 更新（Vercel/Netlify 自动部署）

```bash
# 修改代码后
git add .
git commit -m "Update: 描述你的更改"
git push

# Vercel/Netlify 会自动检测并重新部署
```

### 自己服务器更新

```bash
cd kwa_website
git pull
npm install
npm run build
pm2 restart kwm-website
```

---

## 💡 性能优化建议

1. **启用 CDN**：Vercel 自带全球 CDN
2. **图片优化**：Next.js 自动优化图片
3. **缓存策略**：已在 `next.config.js` 中配置
4. **压缩**：生产环境自动启用 Gzip

---

## 🆘 常见问题

**Q: 部署后图片不显示？**
A: 检查 `next.config.js` 中的 `remotePatterns` 配置

**Q: 环境变量不生效？**
A: 确保变量名以 `NEXT_PUBLIC_` 开头（客户端变量）

**Q: 部署失败？**
A: 检查 Node.js 版本（需要 18+）和构建日志

**Q: 中文路由 404？**
A: 确保 `middleware.ts` 正确配置了 locale

---

## 📞 技术支持

- Next.js 文档：https://nextjs.org/docs
- Vercel 文档：https://vercel.com/docs
- Sanity 文档：https://www.sanity.io/docs
