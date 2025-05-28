# 個人自傳網站 | Personal Biography Website

一個現代化的一頁式自傳網站，支援中英文切換和亮暗色主題。

## 功能特色

- 🌐 **雙語支援**: 支援繁體中文和英文切換
- 🌙 **主題切換**: 支援亮色、暗色和系統主題
- 📱 **響應式設計**: 適配各種螢幕尺寸
- ⚡ **現代技術**: 使用 Next.js 15、React 19 和 Tailwind CSS
- 🎨 **美觀設計**: 現代化的 UI 設計和流暢的動畫效果
- 📝 **易於自定義**: 透過 JSON 檔案輕鬆更新內容
- 💼 **專案展示**: 精美的專案卡片展示，包含技術棧和專案亮點
- 🏷️ **專案狀態**: 清楚標示專案維護狀態（維護中/停止維護/已棄用）

## 技術棧

- **框架**: Next.js 15 with App Router
- **UI 庫**: React 19
- **樣式**: Tailwind CSS 4
- **組件庫**: shadcn/ui
- **圖示**: Lucide React
- **主題**: next-themes
- **字體**: Noto Sans TC (中文) + Geist (英文)
- **包管理器**: Bun

## 快速開始

### 安裝依賴

```bash
bun install
```

### 啟動開發伺服器

```bash
bun dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建置生產版本

```bash
bun run build
bun start
```

## 自定義內容

### 更新個人資訊

編輯 `data/biography.json` 檔案來更新您的個人資訊：

```json
{
  "personal": {
    "zh": {
      "name": "您的姓名",
      "title": "職業頭銜",
      "email": "your.email@example.com",
      "phone": "+886-912-345-678",
      "location": "台灣，台北",
      "summary": "這裡是您的個人簡介..."
    },
    "en": {
      "name": "Your Name",
      "title": "Professional Title",
      "email": "your.email@example.com",
      "phone": "+886-912-345-678",
      "location": "Taipei, Taiwan",
      "summary": "This is your personal summary..."
    }
  }
}
```

### 資料結構說明

JSON 檔案包含以下主要區塊：

1. **personal**: 個人基本資訊
2. **experience**: 工作經歷
3. **projects**: 經手專案
4. **education**: 教育背景
5. **skills**: 技能專長

每個區塊都包含 `zh` (中文) 和 `en` (英文) 兩個版本。

### 新增工作經歷

在 `experience` 區塊中新增項目：

```json
{
  "company": "公司名稱",
  "position": "職位名稱", 
  "period": "2020年1月 - 現在",
  "description": "工作描述和主要成就"
}
```

### 新增專案

在 `projects` 區塊中新增專案：

```json
{
  "name": "專案名稱",
  "period": "2023年3月 - 2023年8月",
  "status": "active",
  "description": "專案詳細描述，包含功能和技術特色",
  "technologies": ["React", "Node.js", "MongoDB"],
  "highlights": [
    "專案亮點1",
    "專案亮點2",
    "專案亮點3"
  ],
  "link": "https://github.com/yourname/project",
  "demo": "https://demo.project.com"
}
```

#### 專案欄位說明

- **name**: 專案名稱
- **period**: 開發時間
- **status**: 專案狀態（必填）
  - `"active"`: 維護中 - 綠色標籤，表示專案正在積極維護和開發
  - `"deprecated"`: 停止維護 - 黃色標籤，表示僅提供安全性更新，不再新增功能
  - `"abandoned"`: 已棄用 - 紅色標籤，表示完全停止維護
- **description**: 專案描述
- **technologies**: 使用的技術棧（陣列）
- **highlights**: 專案亮點（陣列）
- **link**: GitHub 或程式碼連結
- **demo**: 線上展示連結（可為 null）

#### 專案狀態視覺標識

- 🟢 **維護中 (Active)**: 表示專案正在積極開發和維護
- 🟡 **停止維護 (Deprecated)**: 表示專案已停止新功能開發，僅提供必要的安全性更新
- 🔴 **已棄用 (Abandoned)**: 表示專案已完全停止維護，不再提供任何更新

### 新增技能分類

在 `skills` 區塊中新增技能分類：

```json
{
  "category": "技能分類名稱",
  "items": ["技能1", "技能2", "技能3"]
}
```

## 自定義樣式

### 修改主題色彩

編輯 `app/globals.css` 中的 CSS 變數來自定義色彩：

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* 其他色彩變數... */
}
```

### 修改字體

在 `app/layout.tsx` 中更改字體設定：

```typescript
import { Noto_Sans_TC, Inter } from "next/font/google";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
```

## 部署

### Vercel (推薦)

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 設定建置指令為 `bun run build`
4. 部署完成

### 其他平台

確保平台支援 Bun 或設定使用 npm：

```bash
# 如果平台不支援 Bun，可以使用 npm
npm install
npm run build
npm start
```

## 專案結構

```
autobiography/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx           # 主頁面
├── components/            # React 組件
│   ├── ui/               # shadcn/ui 基礎組件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── dropdown-menu.tsx
│   ├── biography-sections.tsx  # 自傳內容區塊
│   ├── language-toggle.tsx     # 語言切換
│   ├── theme-provider.tsx      # 主題提供者
│   └── theme-toggle.tsx        # 主題切換
├── data/                  # 資料檔案
│   └── biography.json    # 自傳內容（包含專案資料）
├── lib/                   # 工具函數
└── public/               # 靜態資源
```

## 內容區塊

### 1. 個人資訊
- 姓名、職稱
- 聯絡資訊（Email、電話、地址）
- 個人簡介

### 2. 工作經歷
- 公司名稱、職位
- 工作時間
- 職責描述

### 3. 經手專案 ⭐ 新功能
- 專案名稱和開發時間
- 專案狀態標籤（維護中/停止維護/已棄用）
- 專案描述和技術棧
- 專案亮點列表
- GitHub 和展示連結

### 4. 教育背景
- 學校、學位
- 就學時間
- 相關描述

### 5. 技能專長
- 分類展示技能
- 標籤式呈現

## 瀏覽器支援

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯絡

如有問題或建議，請透過以下方式聯絡：

- Email: [在此填入您的聯絡信箱]
- GitHub: [在此填入您的 GitHub 連結]

---

**注意**: 請記得更新 `data/biography.json` 中的個人資訊，並根據需要自定義樣式和內容。
