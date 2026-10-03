/**
 * ============================================================
 * src/utils/debounce.js —— 防抖函数
 * ------------------------------------------------------------
 * 等事件停止触发 delay 毫秒后再执行 fn，中间连续触发会重新计时。
 *
 * 适用场景：
 *   - 输入框搜索联想（停下来才发请求）
 *   - 窗口 resize（停止缩放才重新布局）
 *   - 按钮防止连点（快速点多次只执行一次）
 *
 * 用法：
 *   import debounce from "@/utils/debounce";
 *   const onSearch = debounce((val) => console.log(val), 300);
 *   input.addEventListener("input", (e) => onSearch(e.target.value));
 * ============================================================
 */

/**
 * 防抖：连续触发只执行最后一次
 * @param {Function} fn   要防抖的函数
 * @param {number} delay  延迟毫秒数（默认 300ms）
 * @returns {Function}  防抖后的新函数
 */
export default function debounce(fn, delay = 300) {
  let timer = null;

  // 返回一个闭包函数，每次调用都会清掉上一个定时器
  return function (...args) {
    // 每次触发都清掉之前的定时器，重新开始计时
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
