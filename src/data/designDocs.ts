export type DesignDoc = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const designDocs: DesignDoc[] = [
  {
    id: "material-detail-prd",
    title: "产品需求说明（PRD）",
    date: "2026-04-07",
    content: `# 材料详情页产品需求说明（PRD）

## 1. 产品目标
为选材、采购与技术支持用户提供统一、可快速判断的材料详情页，支持从信息浏览到询价、对比、收藏的闭环操作。

## 2. 目标用户
- 研发/选材工程师
- 采购与供应链人员
- 销售/FAE支持人员

## 3. 页面结构
| 区域 | 内容 |
|------|------|
| 顶部导航 | 材料信息、认证证书、物性参数、替代材料、图表曲线、相关资料 |
| 主内容区 | 材料信息、认证证书、物性参数、替代材料、图表曲线、相关资料 |
| 右侧辅助区 | 价格趋势、专家服务、材料计算器 |
| 设计文档面板 | 展示当前需求说明并支持复制 |

## 4. 功能需求

### 4.1 顶部导航
- 导航项仅保留：材料信息、认证证书、物性参数、替代材料、图表曲线、相关资料
- 不显示“耐化参数”一级导航
- 导航标题间距统一加大
- 点击导航项平滑滚动到对应区块
- 页面滚动时自动更新导航激活态

### 4.2 物性参数模块
- 标签顺序固定为：性能参数 -> 加工参数 -> 黄卡参数 -> 耐化参数
- “耐化参数”作为物性参数模块内同级标签展示
- 标签切换时仅更新当前内容区域
- 性能参数、加工参数、黄卡参数表头显示“未注明数据均源自原版”
- 上述提示文案使用橙色文字展示，不增加边框

### 4.3 耐化参数子模块
- 支持筛选条件：参数名称、参数分类、测试评级
- 测试评级统一中文显示：优、好、弱、差
- 筛选结果按条件实时更新
- 表格表头“耐化参数”右侧显示文案：以下数据来源于塑库网推测
- 耐化参数表头不显示“未注明数据均源自原版”
- “以下数据来源于塑库网推测”使用橙色文字展示，不增加边框
- 页面中不再显示独立的“提示+评级图例”横条区域

### 4.4 替代材料与资料模块
- 替代材料模块展示：替代型号、推荐原因、操作
- 图表曲线模块保留“查看全部”入口
- 相关资料模块保留标签切换与资料卡片

## 5. 交互与体验要求
- 筛选与切换操作需有即时反馈
- 页面在桌面端常用分辨率下保持可读与稳定布局
- 构建通过，无编译与类型错误

## 6. 验收标准（UAT）
- 顶部导航不出现“耐化参数”
- 物性参数内可切换“耐化参数”标签
- 测试评级在筛选控件与表格中均为中文展示
- “以下数据来源于塑库网推测”显示在耐化参数表头右侧
- “未注明数据均源自原版”仅出现在性能参数/加工参数/黄卡参数表头
- 所有提示文案均为橙色文字且无边框
- 原截图中的整段提示区域已删除`
  },
  {
    id: "material-detail-tracking",
    title: "埋点设计说明",
    date: "2026-04-07",
    content: `# 材料详情页埋点设计说明

## 1. 埋点目标
- 评估详情页信息架构调整后的使用效率
- 追踪关键转化行为（询价、下载、对比、收藏）
- 识别参数模块（尤其耐化参数）的真实使用深度

## 2. 事件列表
| 事件名 | 触发时机 | 关键字段 |
|------|------|------|
| page_view_material_detail | 用户进入材料详情页 | material_id, material_name, source_page |
| nav_click | 点击顶部导航标签 | tab_key, tab_name, material_id |
| param_tab_switch | 切换物性参数子标签 | tab_name, material_id |
| chemical_filter_change | 修改耐化筛选条件 | query, category, grade, material_id |
| chemical_filter_result | 耐化筛选结果返回后 | result_count, category, grade, material_id |
| action_click | 点击关键操作按钮 | action_type, material_id, position |

## 3. 字段定义规范
- \`material_id\`: 材料唯一标识，必填
- \`source_page\`: 来源页面（search/list/recommend/direct），必填
- \`tab_key\`: 导航英文键（material/cert/property/replace/charts/materials）
- \`tab_name\`: 页面展示中文名
- \`action_type\`: quote/download/compare/favorite
- \`position\`: 操作按钮所在区块（header/right_rail/replace_table）

## 4. 触发与去重规则
- \`page_view_material_detail\` 每次进入页面仅触发一次
- \`nav_click\` 用户主动点击才触发，滚动联动高亮不触发
- \`param_tab_switch\` 仅在标签值变化时触发
- \`chemical_filter_change\` 用户输入或下拉变化即触发
- 同一参数连续输入建议 500ms 防抖上报

## 5. 口径约定
- “详情页关键操作点击率” = action_click / page_view_material_detail
- “参数模块交互率” = （至少触发一次 param_tab_switch 或 chemical_filter_change 的用户）/ page_view_material_detail
- “耐化筛选使用率” = chemical_filter_change / page_view_material_detail

## 6. 验收清单
- 所有事件均包含 \`material_id\`
- 埋点字段命名统一 snake_case
- 埋点在生产环境可被日志平台正确接收
- 与需求文档中的功能点一一对应，无遗漏`
  }
];
