# 认证证书弹窗背景样式修改计划

## 问题描述
修改认证证书弹窗的样式，具体要求：
1. 弹窗底色改成#F7F8FA
2. 增加一个白色图层，参考图片，置于证书和二维码底部
3. 在顶部预留出一部分弹窗的底色

## 现有代码分析

当前弹窗的结构：
```tsx
<div className="w-full max-w-[560px] rounded-2xl border border-[#e7edf5] bg-white p-6 shadow-2xl">
  {/* 标题和关闭按钮 */}
  <div className="mb-4 flex items-start justify-between gap-4">...</div>
  
  {/* 非服务类型的内容 */}
  {!needService && (...)}  
  
  {/* 服务类型的内容 */}
  {needService ? (
    <div className="mt-4 flex gap-8">
      {/* 左侧区域 */}
      <div className="flex-1 text-center">...</div>
      
      {/* 右侧区域 */}
      <div className="flex-1 text-center">...</div>
    </div>
  ) : null}
</div>
```

## 解决方案

### 1. 修改弹窗底色
- 将弹窗的 `bg-white` 改为 `bg-[#F7F8FA]`

### 2. 添加白色图层
- 在服务类型的内容区域添加一个白色的背景图层
- 该图层应该置于证书和二维码底部
- 确保白色图层与弹窗边缘有适当的间距

### 3. 顶部预留弹窗底色
- 调整标题区域的样式，确保顶部有一部分弹窗的底色显示出来
- 可能需要调整 `p-6` 内边距或添加额外的容器

## 实施步骤

1. 打开 `src/components/CertificateDownloadModal.tsx` 文件
2. 修改弹窗的背景颜色为 `bg-[#F7F8FA]`
3. 为服务类型的内容区域添加白色背景图层：
   - 在 `needService` 条件下的 `div` 中添加白色背景
   - 调整内边距和圆角，确保与图片一致
4. 调整标题区域的样式，确保顶部有一部分弹窗的底色显示出来
5. 测试修改效果
6. 自我检查，确保与图片的结构和样式一致

## 预期结果

- 弹窗底色改为 #F7F8FA
- 证书和二维码底部有白色图层
- 顶部预留出一部分弹窗的底色
- 整体布局与图片参考一致