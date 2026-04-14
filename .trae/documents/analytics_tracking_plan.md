# 材料详情页埋点方案

## 1. 页面结构分析

通过分析代码库，材料详情页包含以下主要模块：

### 1.1 核心组件

* `TopTabs.tsx` - 顶部导航标签

* `HeroBar.tsx` - 顶部操作栏（询价采购、下载资料等）

* `RightRail.tsx` - 右侧边栏（价格趋势、专家服务、材料计算器）

* `DataTable.tsx` - 数据表格组件（物性参数、替代材料）

* `CertificateDownloadModal.tsx` - 认证证书下载弹窗

* `Toast.tsx` - 操作提示组件

### 1.2 页面功能

1. **导航功能** - 顶部标签切换（材料信息、认证证书、物性参数等）
2. **交互功能** - 按钮点击（询价采购、下载资料、发布需求/供应等）
3. **表单功能** - 询价采购弹窗表单
4. **数据展示** - 物性参数表格、替代材料表格
5. **弹窗功能** - 认证证书下载弹窗
6. **价格趋势** - 材料价格选择和图表展示
7. **专家服务** - 咨询按钮
8. **材料计算器** - 性能计算入口

## 2. 埋点方案

### 2.1 埋点类型

* **页面浏览** - 页面加载、停留时间

* **交互事件** - 按钮点击、表单提交

* **数据筛选** - 下拉选择、标签切换

* **模态框** - 弹窗打开/关闭

* **错误事件** - 操作失败、表单验证

### 2.2 埋点位置

#### 2.2.1 页面级埋点

* 页面加载完成

* 页面离开

* 页面停留时间

#### 2.2.2 导航埋点

* 顶部标签切换（材料信息、认证证书、物性参数、替代材料、图表曲线、选材资料）

* 返回顶部按钮点击

#### 2.2.3 操作按钮埋点

* 询价采购按钮

* 下载资料按钮

* 发布需求/供应按钮

* 查看供应按钮

#### 2.2.4 认证证书埋点

* 证书点击打开弹窗

* 收藏/取消收藏证书

* 下载证书按钮

* 联系客服按钮

#### 2.2.5 物性参数埋点

* 物性参数标签切换（性能参数、加工参数、黄卡参数、耐化参数）

* 耐化参数筛选（搜索、分类、评级）

#### 2.2.6 替代材料埋点

* 加对比/取消对比

* 收藏/取消收藏

#### 2.2.7 价格趋势埋点

* 材料选择下拉框变化

* 价格趋势图表交互（鼠标悬停、点击）

#### 2.2.8 右侧边栏埋点

* 立即咨询按钮

* 开始性能计算按钮

### 2.3 埋点数据结构

每个埋点事件应包含以下数据：

```javascript
{
  // 事件基本信息
  event: '事件名称',
  category: '事件分类',
  action: '事件动作',
  label: '事件标签',
  value: '事件值',
  
  // 页面信息
  page: '材料详情页',
  materialId: '材料ID',
  materialName: '材料名称',
  
  // 用户信息
  userId: '用户ID',
  isMember: '是否会员',
  
  // 时间信息
  timestamp: '时间戳',
  
  // 设备信息
  deviceType: '设备类型',
  browser: '浏览器',
  screenWidth: '屏幕宽度'
}
```

## 3. 实现方案

### 3.1 技术选型

* 使用第三方分析工具（如Google Analytics、百度统计等）

* 或使用自定义埋点系统

### 3.2 代码实现

#### 3.2.1 全局埋点工具

创建一个埋点工具文件 `src/utils/analytics.ts`，提供埋点方法：

```typescript
// src/utils/analytics.ts
export const trackEvent = (event: string, data: Record<string, any>) => {
  // 实现埋点逻辑
  console.log('Analytics Event:', event, data);
  
  // 示例：发送到分析服务
  // analyticsService.track(event, data);
};

export const trackPageView = (page: string, data?: Record<string, any>) => {
  trackEvent('page_view', { page, ...data });
};

export const trackClick = (element: string, data?: Record<string, any>) => {
  trackEvent('click', { element, ...data });
};
```

#### 3.2.2 组件埋点示例

**TopTabs 组件埋点：**

```typescript
// src/components/TopTabs.tsx
import { trackClick } from '@/utils/analytics';

// 在标签点击时onst handleTabClick = (key: TabKey) => {
  trackClick('tab_switch', {
    tab: key,
    materialId: '当前材料ID'
  });
  onSelect(key);
};
```

**HeroBar 组件埋点：**

```typescript
// src/components/HeroBar.tsx
import { trackClick } from '@/utils/analytics';

// 询价采购按钮点击
const handleInquiryClick = () => {
  trackClick('inquiry_click', {
    materialId: '当前材料ID'
  });
  // 打开询价弹窗
};
```

**替代材料表格埋点：**

```typescript
// src/components/DataTable.tsx
import { trackClick } from '@/utils/analytics';

// 加对比按钮点击
const handleCompareToggle = (rowIndex: number) => {
  trackClick('compare_toggle', {
    materialId: '当前材料ID',
    alternativeIndex: rowIndex,
    status: comparedRows.has(rowIndex) ? 'removed' : 'added'
  });
  // 切换对比状态
};
```

## 4. 埋点验证

### 4.1 测试方法

* 使用浏览器开发者工具监控网络请求

* 查看分析平台的实时事件数据

* 模拟用户操作，验证埋点触发

### 4.2 验证指标

* 事件触发率

* 数据完整性

* 事件处理速度

* 浏览器兼容性

## 5. 风险与注意事项

### 5.1 隐私合规

* 确保埋点数据符合隐私法规

* 提供用户选择退出的选项

### 5.2 性能影响

* 埋点代码应轻量化，避免影响页面性能

* 使用异步发送，不阻塞页面渲染

### 5.3 数据准确性

* 确保埋点事件触发时机正确

* 避免重复发送事件

* 处理异常情况

## 6. 后续维护

### 6.1 埋点文档更新

* 当页面结构或功能变更时，及时更新埋点文档

* 保持埋点方案与实际代码一致

### 6.2 数据分析

* 定期分析埋点数据

* 根据数据优化页面设计和用户体验

### 6.3 A/B测试

* 使用埋点数据支持A/B测试

* 验证页面优化效果

## 7. 总结

本埋点方案覆盖了材料详情页的主要功能和交互点，通过系统化的埋点设计，可以：

1. **了解用户行为** - 分析用户如何使用页面功能
2. **优化用户体验** - 根据数据调整页面设计
3. **提升转化率** - 识别转化瓶颈并优化
4. **数据驱动决策** - 基于实际用户数据制定策略

通过实施此埋点方案，可以为材料详情页的持续优化提供有力的数据支持。
