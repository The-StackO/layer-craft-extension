/**
 * 获取当前页面的 URL，并移除所有的查询参数（query parameters）。
 * 例如，将 "https://www.example.com/path?name=test&page=1" 转换为 "https://www.example.com/path"。
 * @returns {string} 清理后的 URL 字符串。
 */
export function getCurrentLocation(): string {
  const { origin, pathname } = window.location;

  return origin + pathname;
}
