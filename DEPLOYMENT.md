# KWA 网站部署指南（双站同域）

本文是当前项目的执行版方案：  
- 用户只看到一个域名：`kwmartcenter.com`  
- 后端是双基础设施：海外站 + 国内站  
- 同一套代码，不同环境变量部署两次

## 1. 什么时候需要上国内云

先用当前 Vercel 方案跑一段时间，满足任一条件就进入国内云部署：

1. 中国大陆 7 天可用率低于 `99.5%`
2. 中国大陆首页 `P95 TTFB > 1.5s` 且连续 3 天
3. 联系表单大陆提交失败率高于 `3%`
4. 有明确大陆投放/展览活动，且预计大陆访问占比 > `40%`

## 2. 目标架构（同一个域名）

1. 海外入口：Vercel（Global）
2. 国内入口：国内云（阿里云/腾讯云，CN）
3. DNS：智能线路解析（同一个主域名，按访问区域分流）
4. 内容：统一从 Sanity 读（后续可升级为国内内容快照）

## 3. 代码层已支持的环境变量

在 `.env.local.example` 已加入：

```env
NEXT_PUBLIC_SITE_REGION=global
NEXT_PUBLIC_SITE_URL=https://kwmartcenter.com
NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formspree.io/f/xbdabrdw
```

说明：
1. `NEXT_PUBLIC_SITE_REGION`：当前构建目标（`global` 或 `cn`）
2. `NEXT_PUBLIC_SITE_URL`：用于 sitemap / robots / metadata 生成
3. `NEXT_PUBLIC_CONTACT_FORM_ACTION`：表单投递地址，可 global/cn 分开

## 4. 两套部署怎么做

### 4.1 海外站（Global）- Vercel

1. Vercel 绑定 GitHub 仓库并持续部署 `main`
2. 环境变量设置：
   - `NEXT_PUBLIC_SITE_REGION=global`
   - `NEXT_PUBLIC_SITE_URL=https://kwmartcenter.com`
   - `NEXT_PUBLIC_CONTACT_FORM_ACTION=<global form endpoint>`
   - Sanity 变量按现有配置

### 4.2 国内站（CN）- 国内云

推荐容器或 Node+Nginx 部署，最小流程：

1. 准备一台国内云服务器（阿里云/腾讯云，华北或华东）
2. 安装 Node.js 18+ 与 Nginx
3. 拉代码并构建：
   ```bash
   git clone <repo>
   cd kwa_website
   npm ci
   npm run build
   ```
4. 配置 CN 环境变量：
   ```env
   NEXT_PUBLIC_SITE_REGION=cn
   NEXT_PUBLIC_SITE_URL=https://kwmartcenter.com
   NEXT_PUBLIC_CONTACT_FORM_ACTION=<cn form endpoint>
   ```
5. 启动：
   ```bash
   npm run start
   ```
6. Nginx 反代到 `localhost:3000`
7. 配置 HTTPS（国内云证书服务或 Let’s Encrypt）
8. 完成 ICP 备案（主域名）

## 5. 同域名分流（关键）

在 DNS 服务商使用“线路/地域解析”：

1. `kwmartcenter.com` 对海外线路指向 Vercel
2. `kwmartcenter.com` 对中国大陆线路指向国内云入口
3. `www.kwartcenter.com` 与根域保持同策略（可统一 301 到根域）

注意：
1. 不要把主域名直接写死到某个固定 Vercel IP
2. 以 CNAME/ALIAS/服务商推荐方式接入 Vercel
3. 国内站建议挂国内 CDN，再由 CDN 回源国内云

## 6. 回滚策略

1. 若国内站故障：DNS 线路解析临时全部切回海外站
2. 若海外站故障：海外线路切至备用源（可选）
3. 应保留最近 1 个稳定版本构建产物用于快速回滚

## 7. 发布检查清单

1. `https://kwmartcenter.com/zh` 可访问
2. `https://kwmartcenter.com/en` 可访问
3. `https://kwmartcenter.com/sitemap.xml` 域名正确
4. `https://kwmartcenter.com/robots.txt` sitemap 域名正确
5. 联系页表单在大陆与海外都能提交
6. 展览详情与 Press 页面打开无跨境超时

