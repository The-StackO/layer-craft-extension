import { generateId } from '@/utils/generator';
import { db } from '../database';
import type { HistoryItem } from './types';

// Omit<HistoryItem, 'id' | 'timestamp'> 表示创建一个新类型，
// 它拥有 HistoryItem 的所有属性，除了 'id' 和 'timestamp'，
// 因为这两个字段将在 addHistoryItem 方法内部自动生成。
export type NewHistoryItem = Omit<HistoryItem, 'id' | 'timestamp'>;

export class HistoryService {
  /**
   * 添加一个新的历史记录项。
   * ID 和时间戳将在此方法中自动生成。
   * @param item - 一个不包含 id 和 timestamp 的 HistoryItem 对象。
   * @returns {Promise<string>} 返回新创建项的 ID。
   */
  async addHistoryItem(item: NewHistoryItem): Promise<string> {
    const fullItem: HistoryItem = {
      ...item,
      id: generateId(),
      timestamp: Date.now(),
    };

    console.log('Adding history item to Dexie:', fullItem);
    return db.history.add(fullItem);
  }

  /**
   * 根据 URL 获取所有相关的历史记录。
   * @param url - 要查询的页面的 URL (不含参数)。
   * @returns {Promise<HistoryItem[]>} 返回匹配的历史记录数组，按时间戳降序排列。
   */
  async getHistoryByUrl(url: string): Promise<HistoryItem[]> {
    return db.history.where('url').equals(url).reverse().sortBy('timestamp');
  }

  /**
   * 获取所有的历史记录。
   * @returns {Promise<HistoryItem[]>} 返回所有的历史记录，按时间戳降序排列。
   */
  async getAllHistory(): Promise<HistoryItem[]> {
    // reverse() 会将排序从升序变为降序
    return db.history.orderBy('timestamp').reverse().toArray();
  }

  /**
   * 根据 ID 删除一个历史记录项。
   * @param id - 要删除的记录的 ID。
   * @returns {Promise<void>}
   */
  async deleteHistoryItem(id: string): Promise<void> {
    return db.history.delete(id);
  }

  /**
   * 清空指定 URL 的所有历史记录。
   * @param url - 要清空历史记录的 URL。
   * @returns {Promise<number>} 返回被删除的记录数量。
   */
  async clearHistoryByUrl(url: string): Promise<number> {
    const itemsToDelete = await db.history.where('url').equals(url).primaryKeys();
    // bulkDelete returns a promise that resolves when deletion is done.
    await db.history.bulkDelete(itemsToDelete);
    return itemsToDelete.length;
  }

  /**
   * 清空所有历史记录。
   * @returns {Promise<void>}
   */
  async clearAllHistory(): Promise<void> {
    return db.history.clear();
  }
}
