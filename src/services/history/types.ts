export interface HistoryItem {
  id: string; // 记录ID - 在存入数据库前必须赋值
  type: 'text_replace' | 'dom_delete' | 'image_replace'; // 操作类型
  url: string; // 操作页面, 不加参数
  xpath: string; // 操作目标, xpath
  before: string; // 操作前
  after: string; // 操作后
  timestamp: number; // 操作时间 - 在存入数据库前必须赋值
}
