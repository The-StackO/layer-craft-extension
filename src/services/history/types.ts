export type ChangeType = 'text_replace' | 'element_delete' | 'image_replace';

export interface HistoryItem {
  id: string; // 记录ID - 在存入数据库前必须赋值
  type: ChangeType; // 操作类型
  url: string; // 操作页面, 不加参数
  xpath: string; // 操作目标, xpath
  index?: number; // 目标在父元素中的索引
  before: string; // 操作前
  after: string; // 操作后
  timestamp: number; // 操作时间 - 在存入数据库前必须赋值
}
