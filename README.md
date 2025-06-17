# JKOPay Fullstack Homework

這是一個使用 Next.js 和 Node.js 開發的全端專案，包含前端和後端兩個部分。

## Introduction

- [Live Demo](https://jkopay-fullstack-client-261573009903.asia-east1.run.app/donations)
- [Github Repo](https://github.com/jack8966/JKOPay_FullStack)

## 專案結構

```
.
├── client/         # Next.js 前端應用
└── server/         # Node.js + Express 後端應用
```

## 系統需求

- Node.js (v18 或更高版本)
- PostgreSQL
- npm
- Docker 和 Docker Compose (可選，用於容器化開發)

## 啟動順序

**重要：請務必先啟動後端服務，再啟動前端應用。**

## 後端 (Server)

後端使用 Node.js、Express、TypeScript 和 PostgreSQL 開發，採用領域驅動設計（DDD）架構。

透過 Docker build image 後，部署到 GCP Cloud Run，並連線至 GCP Cloud SQL(Postgres)。
使用的是 GCP Cloud Build 綁定 [Github repo](https://github.com/jack8966/JKOPay_FullStack) 並觸發部署流程。
並且透過 GCP Secret Manager 注入 Production env variables。

### 使用 Docker 開發

1. 進入後端目錄

```bash
cd server
```

2. 執行資料庫遷移：

```bash
npm run migration:show:dev
npm run migration:run:dev
```

3. 填充測試資料（可選）：

```bash
npm run seed:dev
```

4. 啟動開發環境 (環境變數預設參考 .env.development)：

```bash
docker-compose up -d
```

4. 後端 API 將在 http://localhost:3000 運行，API 文件可在 `/api-docs` 路徑查看。

## 前端 (Client)

前端使用 Next.js 框架開發，並透過 Docker build image 後，部署到 GCP Cloud Run。

### 安裝與啟動

**注意：請確保後端服務已經成功啟動後，再執行以下步驟。**

1. 進入前端目錄：

```bash
cd client
```

2. 安裝依賴：

```bash
npm install
```

3. 啟動開發伺服器：

```bash
npm run dev
```

前端應用將在 http://localhost:3001 運行。

## 開發工具

### 程式碼品質

前端：

```bash
cd client
npm run lint
```

後端：

```bash
cd server
npm run lint
npm run format
```

### 測試

後端測試：

```bash
cd server
npm test
```

## 安全性功能

後端包含多項安全性功能：

- Helmet 用於 HTTP 安全標頭
- CORS 保護
- 速率限制
- HTTP 參數污染防護
- 使用 express-validator 進行輸入驗證
