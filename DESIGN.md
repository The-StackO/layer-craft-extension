# LayerCraft Design System

本文档是"层舟 (LayerCraft)"浏览器插件的官方设计指南，旨在确保产品在视觉和体验上的一致性。

## 调色板 (Color Palette)

我们选择了一套以"创意橙"为主色、"创意蓝"为辅色的调色板，旨在体现产品的**创造力、活力与编辑功能**。

---

### 主题色: 活力橙 (Vibrant Orange)

"活力橙"传达现代、活力和创造力，鲜明的设计让用户界面更加生动，完美契合网页内容编辑的核心功能。

- **Primary:** `#F0863A` <span style="display:inline-block; width:12px; height:12px; background-color:#F0863A; border:1px solid #ccc;"></span>
- **Hover:** `#D97533` <span style="display:inline-block; width:12px; height:12px; background-color:#D97533; border:1px solid #ccc;"></span>
- **Active:** `#C0642C` <span style="display:inline-block; width:12px; height:12px; background-color:#C0642C; border:1px solid #ccc;"></span>
- **Text on Primary:** `#FFFFFF` <span style="display:inline-block; width:12px; height:12px; background-color:#FFFFFF; border:1px solid #ccc;"></span>

**用途:**
- 关键操作按钮 (如“保存”、“应用”)
- 导航栏、页头等主要 UI 框架
- 图标

---

### 辅色: 科技青 (Tech Cyan)

"科技青"作为审查器高亮色，与活力橙形成现代对比，提供清晰的功能指示和视觉引导。

- **Accent:** `#06B6D4` <span style="display:inline-block; width:12px; height:12px; background-color:#06B6D4; border:1px solid #ccc;"></span>
- **Hover:** `#0891B2` <span style="display:inline-block; width:12px; height:12px; background-color:#0891B2; border:1px solid #ccc;"></span>
- **Active:** `#0E7490` <span style="display:inline-block; width:12px; height:12px; background-color:#0E7490; border:1px solid #ccc;"></span>

**用途:**
- 特殊提示、徽章
- 新功能引导
- 需要与主操作区分的次要操作

---

### 审查器高亮 (Inspector Highlight)

这是核心功能的交互颜色，需要清晰且具有"编辑感"。

- **Fill:** `rgba(240, 134, 58, 0.25)` (使用主色"活力橙"的 25% 透明度)
- **Main Border:** `#F0863A` (主色"活力橙")
- **Glow Effect:** `#F0863A` (主色"活力橙")

---

### 中性色 (Neutral Colors)

用于文本、背景和分割线，是构成界面的基础。

- **Background Main:** `#F9FAFB` (极浅的冷灰色) <span style="display:inline-block; width:12px; height:12px; background-color:#F9FAFB; border:1px solid #ccc;"></span>
- **Background Subtle:** `#FFFFFF` (纯白) <span style="display:inline-block; width:12px; height:12px; background-color:#FFFFFF; border:1px solid #ccc;"></span>
- **Border:** `#E5E7EB` (浅灰色) <span style="display:inline-block; width:12px; height:12px; background-color:#E5E7EB; border:1px solid #ccc;"></span>
- **Text Main:** `#1F2937` (深灰蓝) <span style="display:inline-block; width:12px; height:12px; background-color:#1F2937; border:1px solid #ccc;"></span>
- **Text Subtle:** `#6B7280` (中灰色) <span style="display:inline-block; width:12px; height:12px; background-color:#6B7280; border:1px solid #ccc;"></span>
- **Text Light:** `#9CA3AF` (更浅的灰色) <span style="display:inline-block; width:12px; height:12px; background-color:#9CA3AF; border:1px solid #ccc;"></span>
- **Disabled Background:** `#F3F4F6` (失效背景) <span style="display:inline-block; width:12px; height:12px; background-color:#F3F4F6; border:1px solid #ccc;"></span>
- **Disabled Text:** `#9CA3AF` (失效文字) <span style="display:inline-block; width:12px; height:12px; background-color:#9CA3AF; border:1px solid #ccc;"></span>

---

### 语义颜色 (Semantic Colors)

用于标准化的用户反馈，如成功、警告和错误状态。

- **Success:** `#22C55E` (绿色) <span style="display:inline-block; width:12px; height:12px; background-color:#22C55E; border:1px solid #ccc;"></span>
- **Warning:** `#F59E0B` (琥珀色) <span style="display:inline-block; width:12px; height:12px; background-color:#F59E0B; border:1px solid #ccc;"></span>
- **Error / Danger:** `#DC2626` (红色) <span style="display:inline-block; width:12px; height:12px; background-color:#DC2626; border:1px solid #ccc;"></span>

---

## 组件应用指南 (Component Application Guide)

### 按钮 (Button)

#### 主要按钮 (Primary)
- **Background:** `var(--lc-primary)`
- **Text:** `var(--lc-primary-text)`
- **Hover:** `var(--lc-primary-hover)`
- **Active:** `var(--lc-primary-active)`
- **Disabled Background:** `var(--lc-disabled-bg)`
- **Disabled Text:** `var(--lc-disabled-text)`

#### 次要按钮 (Secondary)
- **Background:** `transparent`
- **Text:** `var(--lc-primary)`
- **Border:** `1px solid var(--lc-primary)`
- **Hover Background:** `rgba(20, 184, 166, 0.05)`
- **Active Background:** `rgba(20, 184, 166, 0.1)`
- **Disabled Text:** `var(--lc-disabled-text)`
- **Disabled Border:** `1px solid var(--lc-border)`

#### 危险按钮 (Danger)
- **Background:** `var(--lc-error)`
- **Text:** `var(--lc-primary-text)`
- **Hover:** `#B91C1C`
- **Active:** `#991B1B`

### 输入框 (Input) & 下拉框 (Select)

- **Background:** `var(--lc-bg-subtle)`
- **Border:** `1px solid var(--lc-border)`
- **Text:** `var(--lc-text-main)`
- **Placeholder Text:** `var(--lc-text-light)`
- **Focus Border:** `1px solid var(--lc-primary)`
- **Error Border:** `1px solid var(--lc-error)`
- **Disabled Background:** `var(--lc-disabled-bg)`

### 浮层 (Popover & Tooltip)

- **Background:** `var(--lc-bg-subtle)`
- **Text:** `var(--lc-text-main)`
- **Border:** `1px solid var(--lc-border)`
- **Box Shadow:** `0 4px 12px rgba(0, 0, 0, 0.1)`