import { profile } from "../../content";

// 居中视频播放器 —— 健身 Reel
// PC:右侧播放器 + 左侧标题描述;移动端:纵向堆叠
export default function ReelSection() {
  const { reel } = profile;
  if (!reel?.videoSrc) return null;

  return (
    <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center p-4 pt-20 md:p-10">
      <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-center">
        {/* 左侧:标题 + 描述(PC)/ 顶部(移动) */}
        <div className="order-2 w-full md:order-1 md:w-1/3">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            Reel
          </h2>
          <h3 className="mt-2 text-xl font-bold text-neutral-50 md:text-2xl">
            {reel.title}
          </h3>
          {reel.caption && (
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              {reel.caption}
            </p>
          )}
        </div>

        {/* 右侧:视频播放器 */}
        <div className="order-1 w-full max-w-md md:order-2 md:w-2/3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <video
              src={reel.videoSrc}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
