# 认证证书弹窗问题修复计划

## 问题描述
1. 证书编号 "E207780" 仍然显示在标题下方，需要删除
2. 关闭按钮仍然是 "×" 符号，需要改为更美观的图标

## 现有代码分析

### 标题区域代码
```tsx
<div className="mb-4 flex items-start justify-between gap-4">
  <div>
    <h3 className="text-[18px] font-bold text-[#202938]">证书资源下载</h3>
    <p className="mt-1 text-[13px] text-[#667085]">
      {certName}
    </p>
    {showRevision ? (
      <p className="mt-1 text-[12px] font-semibold text-[#f65201]">{revisionDate} 修订</p>
    ) : null}
  </div>
  <button
    type="button"
    onClick={onClose}
    className="rounded-full p-1 text-[16px] text-[#98a2b3] hover:bg-[#f4f7fb]"
  >
    ×
  </button>
</div>
```

### 左侧区域代码
```tsx
<div className="flex-1 text-center">
  {/* 证书标志占位符 */}
  <div className="w-32 h-32 mb-4 mx-auto rounded-lg bg-gray-200 flex items-center justify-center">
    <span className="text-gray-500 text-sm">证书标志</span>
  </div>
  
  {/* 证书信息 */}
  <h4 className="text-lg font-bold text-gray-800 mb-2">{certName}</h4>
  <p className="text-sm text-gray-600 mb-1">更新时间：{revisionDate || "2023-07-26"}</p>
  <p className="text-sm text-gray-600 mb-4">有效时间：2029-07-26</p>
  <p className="text-sm text-[#f65201] font-semibold">非公开资料，请咨询客服获取</p>
</div>
```

## 问题原因分析

1. **证书编号显示问题**：
   - 虽然已经从标题下方的描述中移除了 `{certCode ? `（${certCode}）` : ""}`，但证书编号仍然显示
   - 可能的原因：
     - 证书名称 `certName` 本身包含了证书编号
     - 可能有其他地方在显示证书编号
     - 可能是缓存问题

2. **关闭按钮问题**：
   - 当前使用的是简单的 "×" 符号
   - 用户期望的是更美观的图标

## 解决方案

### 1. 解决证书编号显示问题
- 检查 `certName` 的值，确保它不包含证书编号
- 如果 `certName` 包含证书编号，需要在显示时处理
- 或者在组件中添加逻辑，确保不显示证书编号

### 2. 解决关闭按钮问题
- 将 "×" 符号替换为更美观的关闭图标
- 可以使用 Unicode 字符或 SVG 图标
- 调整按钮的大小和样式，使其更加美观

## 实施步骤

1. 打开 `src/components/CertificateDownloadModal.tsx` 文件
2. 检查并修复证书编号显示问题：
   - 如果 `certName` 包含证书编号，处理显示逻辑
   - 确保标题下方和左侧区域都不显示证书编号
3. 修改关闭按钮：
   - 将 "×" 符号替换为更美观的关闭图标
   - 调整按钮的大小和样式
4. 测试修改效果
5. 自我检查，确保证书编号不再显示，关闭按钮更加美观

## 预期结果

- 证书编号 "E207780" 不再显示在标题下方
- 关闭按钮改为更美观的图标
- 整体布局保持一致和美观