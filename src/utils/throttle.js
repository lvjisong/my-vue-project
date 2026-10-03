/**
 * ============================================================
 * src/utils/throttle.js —— 节流函数
 * ------------------------------------------------------------
 * 每隔 interval 毫秒最多执行一次 fn，中间连续触发被忽略。
 *
 * 适用场景：
 *   - 页面滚动（滚动加载更多、吸顶判断）
 *   - 鼠标移动（拖拽、画板）
 *   - 窗口 resize（不需要每帧都触发）
 *
 * 用法：
 *   import throttle from "@/utils/throttle";
 *   const onScroll = throttle(() => console.log(window.scrollY), 200);
 *   window.addEventListener("scroll", onScroll);
 * ============================================================
 */

/**
 * 节流：固定频率执行，一段时间内最多触发一次
 * @param {Function} fn         要节流的函数
 * @param {number} interval      时间间隔毫秒数（默认 300ms）
 * @returns {Function}  节流后的新函数
 */
export default function throttle(fn, interval = 300) {
  let lastTime = 0; // 上次执行的时间戳

  return function (...args) {
    const now = Date.now();
    // 距离上次执行超过间隔时间了，才真正执行
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
