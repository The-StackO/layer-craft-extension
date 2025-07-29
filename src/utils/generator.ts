/**
 * 生成一个唯一的字符串 ID。
 * 使用浏览器内置的 crypto.randomUUID()，它快速、可靠且无需依赖。
 * @returns {string} 一个唯一的 UUID v4 字符串。
 * @throws {Error} 如果 crypto.randomUUID() 在当前环境中不可用。
 */
export function generateId(): string {
  if (crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  } else {
    // 对于现代浏览器扩展，这几乎不可能发生。
    // 如果确实发生了，抛出错误可以帮助快速定位问题。
    throw new Error('crypto.randomUUID() is not available in this environment.');
  }
}