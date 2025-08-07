# LayerCraft - The Web Magic Eraser & Editor 🎨

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE) [![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/The-StackO/layer-craft-extension) 


[简体中文](./README.md)

**LayerCraft** is a browser extension that gives you the superpower to "modify" any website. Whether you want to play a prank, optimize your reading experience, or touch up content before taking a screenshot, LayerCraft works like a magic sticker, allowing you to make changes easily and "peel them off" anytime.

Our goal is to empower every user to create freely on the web, just like a designer.

---

## ✨ Core Features

-   **Real-time Text Editing:** Double-click any text on a webpage to edit it as easily as in a notepad. Say goodbye to complex developer tools—what you see is what you get.
-   **Persistent Changes:** All your modifications to a website are automatically saved in your browser. When you revisit the same page, your "creations" will be restored.
-   **Simple yet Powerful:** We focus on the most core and direct needs, with no complex features or learning curve.

## 🚀 Feature Roadmap

We have a clear plan to make LayerCraft more fun and powerful!

-   [x] **Core Feature:** Real-time text replacement
-   [x] **One-click Undo:** Feel free to experiment; you can always go back.
-   [x] **Image Replacement:** Replace images on a webpage with any image you want.
-   [x] **Element Hiding:** Make any unwanted parts of a page "disappear."
-   [ ] **Screenshot & Share:** Easily capture your masterpiece and share it with friends.

## 🧑‍💻 Development Guide

Before you begin, ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and [npm](https://www.npmjs.com/) installed.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/The-StackO/layer-craft-extension
    cd layer-craft-extension
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Chrome Browser

-   **Run Development Server**
    ```bash
    npm run dev
    ```
    This command starts the development server, generates the unpacked extension files in the `.output/chrome-mv3-dev` directory, and automatically opens Chrome for debugging. For more details, see [WXT - Browser StartUp](https://wxt.dev/guide/essentials/config/browser-startup.html).

-   **Build for Production**
    ```bash
    npm run build && npm run zip
    ```
    This will first build the production version in `.output/chrome-mv3` and then pack it into a `layer-craft-extension-chrome-mv3.zip` file, located in the `.output` folder at the project root.

### Firefox Browser

-   **Run Development Server**
    ```bash
    npm run dev:firefox
    ```
    This command starts the development server, generates the unpacked extension files in the `.output/firefox-mv2-dev` directory, and automatically opens Firefox for debugging. For more details, see [WXT - Browser StartUp](https://wxt.dev/guide/essentials/config/browser-startup.html).

-   **Build for Production**
    ```bash
    npm run build:firefox && npm run zip:firefox
    ```
    This will first build the production version in `.output/firefox-mv2` and then pack it into a `layer-craft-extension-firefox-mv2.zip` file, located in the `.output` folder at the project root.

## 💡 Contributing

We welcome all forms of contributions! If you have any ideas, suggestions, or bug reports, please feel free to submit an [Issue](https://github.com/The-StackO/layer-craft-extension/issues).

---

Built with WXT + Vue 3 + TypeScript.

## 📄 License

This project is licensed under the [Apache License 2.0](./LICENSE).