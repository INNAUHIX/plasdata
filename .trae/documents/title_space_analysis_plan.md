# 标题顶部空白问题分析与解决方案

## 问题描述
询价采购弹窗的标题顶部存在大面积空白，无法将标题上移，即使调整了 `pt-2` 等内边距设置。

## 代码结构分析

### 弹窗整体结构
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
  <div className="relative w-full min-w-[400px] max-w-[500px] overflow-hidden rounded-2xl shadow-2xl">
    <div className="grid grid-cols-1">
      <div className="relative h-full rounded-2xl bg-white p-8">
        {/* 关闭按钮 */}
        <button className="absolute right-4 top-4 ...">...</button>
        
        {/* 标题 */}
        <div className="mb-6 pt-2">
          <h2 className="text-lg font-bold text-gray-800" style={{margin: 0, padding: 0}}>询价采购</h2>
          <p className="text-sm text-gray-500">请填写以下信息，我们将尽快与您联系</p>
        </div>
        
        {/* 表单 */}
        <div className="space-y-[15px]">...</div>
      </div>
    </div>
  </div>
</div>
```

## 问题原因分析

### 1. 表单容器内边距
- 表单容器 `div.relative` 有 `p-8` 的内边距，这会在顶部创建一个8单位（32px）的空白区域
- 这是导致标题顶部存在大面积空白的主要原因

### 2. 关闭按钮定位
- 关闭按钮使用 `position: absolute` 定位，不会影响文档流
- 但标题容器仍然受到表单容器内边距的影响

### 3. 标题容器样式
- 标题容器使用 `pt-2` 尝试调整内边距，但这只能在表单容器内边距的基础上进行微调

## 解决方案

### 方案1：调整表单容器内边距
- 减小表单容器的 `p-8` 内边距，例如改为 `p-4` 或 `p-6`
- 这样可以直接减少顶部空白区域

### 方案2：使用负外边距
- 为标题容器添加负外边距，例如 `mt-[-16px]`
- 这样可以向上移动标题，抵消部分内边距的影响

### 方案3：重新组织布局
- 将关闭按钮和标题放在一个单独的容器中
- 使用 flex 布局来更好地控制它们的位置

## 推荐方案

**方案1：调整表单容器内边距**
- 优点：直接解决根本问题，代码简洁
- 操作：将表单容器的 `p-8` 改为 `p-4` 或 `p-6`
- 影响：可能需要调整其他元素的布局，但影响范围可控

## 实施步骤

1. 打开 `src/components/InquiryModal.tsx` 文件
2. 找到表单容器的 `p-8` 样式
3. 将其修改为 `p-4` 或 `p-6`
4. 调整标题容器的 `pt-2` 为合适的值，确保标题与关闭按钮对齐
5. 测试修改效果

## 预期结果
- 标题顶部的空白区域明显减少
- 标题能够与关闭按钮在垂直方向上对齐
- 整体布局保持美观和一致性