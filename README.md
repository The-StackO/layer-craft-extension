[English](./README_en.md)

# 层舟 - 网页魔术贴 🎨

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE) [![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/The-StackO/layer-craft-extension) 


**层舟 (LayerCraft)** 是一款浏览器插件，它让你拥有“修改”任何网站的超能力。无论你是想开个玩笑、优化阅读体验，还是在截图前美化一下内容，“层舟”都能像魔术贴一样，帮你轻松实现，并随时“撕下”复原。

我们的目标是：让每一个普通用户，都能像设计师一样，在网页上自由创作。

---

## ✨ 核心功能

- **实时文本编辑:** 双击网页上的任何文本，即可像在记事本里一样轻松修改。告别复杂的开发者工具，所见即所得。
- **持久化修改:** 你对网站的所有修改都会被自动保存在你的浏览器中。下次访问同一个页面时，你的“创作”会自动恢复。
- **简单而强大:** 我们专注于最核心、最直接的需求，没有复杂的功能和学习成本。

## 🚀 功能路线图

我们有一个清晰的计划，让“层舟”变得更有趣、更强大！

- [x] **核心功能:** 实时文本替换
- [x] **一键撤销:** 放心大胆地尝试，随时可以反悔。
- [x] **图片替换:** 将网页上的图片换成你想要的任何图片。
- [x] **元素隐藏:** 让页面上任何不想要的部分“消失”。
- [ ] **截图分享:** 轻松截取你的杰作，并分享给朋友。

## 🧑‍💻 开发指南

在开始之前，请确保你已经安装了 [Node.js](https://nodejs.org/) (建议 v18 或更高版本) 和 [npm](https://www.npmjs.com/)。

1.  **克隆仓库**
    ```bash
    git clone https://github.com/The-StackO/layer-craft-extension
    cd layer-craft-extension
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

### Chrome 浏览器

-   **运行开发服务**
    ```bash
    npm run dev
    ```
    该命令会启动开发服务器，在 `.output/chrome-mv3-dev` 目录下生成开发版本的插件文件，并自动打开 chrome 浏览器进行调试，详情查看[WXT - Browser StartUp](https://wxt.dev/guide/essentials/config/browser-startup.html)。

-   **打包**
    ```bash
    npm run build && npm run zip
    ```
    这会首先在 `.output/chrome-mv3` 中构建生产版本，然后将其打包为 `layer-craft-extension-chrome-mv3.zip` 文件，位于项目根目录的 `.output` 文件夹中。

### Firefox 浏览器

-   **运行开发服务**
    ```bash
    npm run dev:firefox
    ```
    该命令会启动开发服务器，在 `.output/firefox-mv2-dev` 目录下生成开发版本的插件文件，，并自动打开 chrome 浏览器进行调试，详情查看[WXT - Browser StartUp](https://wxt.dev/guide/essentials/config/browser-startup.html)。

-   **打包**
    ```bash
    npm run build:firefox && npm run zip:firefox
    ```
    这会首先在 `.output/firefox-mv2` 中构建生产版本，然后将其打包为 `layer-craft-extension-firefox-mv2.zip` 文件，位于项目根目录的 `.output` 文件夹中。

## 💡 贡献

我们欢迎所有形式的贡献！如果你有任何想法、建议或 Bug 反馈，请随时提交一个 [Issue](https://github.com/The-StackO/layer-craft-extension/issues) (链接待定)。

---

由 WXT + Vue 3 + TypeScript 构建。

## 📄 许可证

本项目采用 [Apache License 2.0](./LICENSE) 开源许可证。
