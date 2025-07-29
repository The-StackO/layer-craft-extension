import Dexie, { type Table } from 'dexie';
import type { HistoryItem } from './history/types';

export class LayerCraftDatabase extends Dexie {
  history!: Table<HistoryItem, string>; // 主键类型是 string

  constructor() {
    super('layerCraftDatabase');
    this.version(2).stores({
      // 'id' 是主键
      // 'url' 是一个普通索引，允许多条记录有相同的 url，可以加速按 url 查询
      // 'timestamp' 是索引，可以加速排序
      history: 'id, url, timestamp',
    });
  }
}

export const db = new LayerCraftDatabase();
