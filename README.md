# Bounty - Premium Online Gourmet Store

Bounty is a responsive, single-page gourmet grocery application styled with a forest green and gold theme. The store features real-time search filtering, tactile shopping cart drawer widgets, interactive details modal cards showing nutritional fact tables, and scroll-spy synchronization.

Live URL: [https://Rajesh144142.github.io/bounty-gourmet/](https://Rajesh144142.github.io/bounty-gourmet/)

---

## ✨ Features

* **🎨 Premium Brand Identity**: Styled with high-contrast, polished forest greens, warm gold highlights, clean typography (Outfit & Inter), and micro-animations.
* **🌗 Adaptive Theme Engine**: Supports dark mode and light mode, syncing automatically with user system preferences or toggling instantly via the header icon.
* **🏷️ Visual Category Navigation**: An interactive tab bar (Fruits, Vegetables, Fish & Meat, Beverages & Snacks) that automatically highlights active catalog positions on scroll using double-way scroll-spy tracking.
* **🔍 Real-Time Search Filtering**: A smart input query field that instantly updates categories and hides non-matching cards in real-time.
* **🛒 Tactile Cart Drawer**: A slide-out cart panel with custom quantity control button pairs (`-` and `+`) and circular outline delete buttons.
* **📋 Product Details Modal**: Clicking cards opens nutritional facts charts, key mineral levels, pros, cons, and descriptions dynamically mapped to each item.
* **📱 100% Mobile Responsive**: Audited layout that scales down to narrow screens, featuring a stacked contact form grid, full-width search rows, and flex cards.

---

## 📂 Project Architecture

```bash
bounty-gourmet/
├── index.html            # Core HTML markup structure
├── style.css             # Theme variables, layouts, and responsiveness media queries
├── js/
│   ├── main.js           # DOMContentLoaded bootstrapper & form hooks
│   ├── theme.js          # Dark/Light mode theme state manager
│   ├── navigation.js     # Scroll-spy, tab synchronization, and custom offset scrolls
│   ├── search.js         # Real-time search engine
│   ├── cart.js           # Tactile shopping cart calculator
│   ├── details.js        # Product details data mapper & facts table popup
│   ├── slideshow.js      # Hero banner slideshow loops
│   ├── carousel.js       # Category product slides layout controllers
│   └── modal.js          # Default modal behaviors
└── photo/                # Descriptive, section-prefixed image assets
```

---

## 🚀 Getting Started

### Local Development
Since the project is a static frontend application, you can run it directly:
1. Clone the repository:
   ```bash
   git clone https://github.com/Rajesh144142/bounty-gourmet.git
   ```
2. Open `index.html` in your browser, or start a local static server inside the directory:
   * **NodeJS**: `npx http-server -p 8080`
   * **Python 3**: `python -m http.server 8080`

### Static Deployment
The repository is structured to deploy directly to **GitHub Pages**:
1. Enable Pages under repository **Settings** -> **Pages**.
2. Select the `main` branch as the build source.
3. The page will publish at `https://<your-username>.github.io/bounty-gourmet/`.