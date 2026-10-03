// 弹簧物理引擎：基于 requestAnimationFrame 驱动，遵循 Apple 弹簧设计参数。
// 特点：从当前值/初速度开始、可随时打断、过冲回弹，避免 CSS keyframes 的"砖墙"感。
export function animateSpring({
  from = 0, // 起始值
  to = 1, // 目标值
  stiffness = 190, // 刚度 k（越大越硬）
  damping = 22, // 阻尼 c（越小越弹，Apple 弹窗常用 ~22）
  velocity = 0, // 初始速度（接管手势时传入手指速度）
  onUpdate, // 每帧回调（value, velocity）
  onComplete, // 结束回调
  immediate = false, // 是否立即跳到目标（供"减弱动态效果"使用）
}) {
  let raf = null;
  let current = from;
  let vel = velocity;
  let lastTime = null;

  const cancel = () => {
    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  };

  if (immediate) {
    onUpdate(to);
    onComplete && onComplete();
    return { cancel };
  }

  const step = (time) => {
    if (lastTime === null) lastTime = time;
    let dt = (time - lastTime) / 1000;
    lastTime = time;
    // 切后台 / 掉帧时限制步长，避免数值爆炸
    if (dt > 0.05) dt = 0.05;
    if (dt > 0) {
      // 弹簧运动方程：F = -k*(x - target) - c*v
      vel += (-stiffness * (current - to) - damping * vel) * dt;
      current += vel * dt;
      onUpdate(current, vel);
      if (Math.abs(to - current) < 0.0005 && Math.abs(vel) < 0.0005) {
        onUpdate(to);
        onComplete && onComplete();
        return;
      }
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);

  return { cancel };
}
