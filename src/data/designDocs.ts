export type DesignDoc = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const designDocs: DesignDoc[] = [
  {
    id: "material-detail-tracking",
    title: "埋点设计说明",
    date: "2026-04-14",
    content: `# 材料详情页埋点设计说明

## 1. 页面级埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 页面加载 | 页面完全加载完成 | page_name: 材料详情页<br>material_id: 材料ID<br>material_name: 材料名称<br>referrer: 来源页面<br>user_type: 用户类型 |
| 返回顶部 | 点击返回顶部按钮 | material_id: 材料ID |

## 2. 导航模块埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 顶部标签切换 | 点击顶部导航标签 | material_id: 材料ID<br>tab_name: 标签名称<br>previous_tab: 之前标签 |

## 3. 核心操作埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 询价采购 | 点击询价采购按钮 | material_id: 材料ID |
| 下载资料 | 点击下载资料按钮 | material_id: 材料ID |
| 发布需求/供应 | 点击发布需求/供应按钮 | material_id: 材料ID |
| 查看供应 | 点击查看供应按钮 | material_id: 材料ID<br>supply_count: 供应数量 |
| 收藏材料 | 点击收藏当前材料按钮 | material_id: 材料ID<br>action: 收藏/取消收藏 |
| 加入对比 | 点击加入对比当前材料按钮 | material_id: 材料ID<br>action: 加入/取消对比 |
| 查看替代材料 | 点击替代材料标签或相关内容 | material_id: 材料ID |
| 查看图表曲线 | 点击图表曲线标签或相关内容 | material_id: 材料ID |
| 查看选材资料 | 点击选材资料标签或相关内容 | material_id: 材料ID |

## 4. 认证证书埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 证书查看 | 点击证书图标打开弹窗 | material_id: 材料ID<br>cert_name: 证书名称<br>access_type: 访问类型 |
| 证书收藏 | 点击收藏/取消收藏按钮 | material_id: 材料ID<br>cert_name: 证书名称<br>action: 收藏/取消收藏 |
| 证书下载 | 点击下载证书按钮 | material_id: 材料ID<br>cert_name: 证书名称<br>is_member: 是否会员 |
| 联系客服 | 点击联系客服按钮 | material_id: 材料ID<br>cert_name: 证书名称 |

## 5. 物性参数埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 参数标签切换 | 点击物性参数标签 | material_id: 材料ID<br>tab_name: 标签名称 |
| 耐化参数搜索 | 输入搜索关键词 | material_id: 材料ID<br>keyword: 搜索关键词 |
| 耐化参数筛选 | 选择筛选条件 | material_id: 材料ID<br>category: 分类<br>grade: 评级 |

## 6. 替代材料埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 加对比 | 点击加对比/已加入按钮 | material_id: 材料ID<br>alternative_index: 替代材料索引<br>action: 加入/取消 |
| 收藏替代材料 | 点击收藏/已收藏按钮 | material_id: 材料ID<br>alternative_index: 替代材料索引<br>action: 收藏/取消 |

## 7. 价格趋势埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 材料选择 | 选择材料牌号+颜色 | material_id: 材料ID<br>material_grade: 材料牌号<br>color: 颜色 |
| 更多价格 | 点击价格趋势板块右上角更多价格链接 | material_id: 材料ID |

## 8. 图表曲线埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 查看全部图表 | 点击图表曲线板块查看全部链接 | material_id: 材料ID |

## 9. 选材资料埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 选材资料标签切换 | 点击选材资料板块标签 | material_id: 材料ID<br>tab_name: 标签名称 |
| 更多选材资料 | 点击选材资料板块更多链接 | material_id: 材料ID |

## 10. 右侧边栏埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 专家服务咨询 | 点击立即咨询按钮 | material_id: 材料ID |
| 材料计算器 | 点击开始性能计算按钮 | material_id: 材料ID |

## 11. 表单埋点

| 事件名称 | 触发时机 | 数据字段 |
|----------|----------|----------|
| 表单提交 | 提交询价采购表单 | material_id: 材料ID<br>form_data: 表单数据摘要 |
| 表单验证失败 | 表单验证失败 | material_id: 材料ID<br>error_field: 错误字段<br>error_message: 错误信息 |`
  }
];
