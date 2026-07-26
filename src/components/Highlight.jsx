// 把字符串里的 {关键词} 渲染成彩色高亮 span
// 用法:<Highlight text="我是 {Eric},喜欢 {Web 3D}" />
export default function Highlight({ text, className = "" }) {
  if (!text) return null;
  // 按 {xxx} 分割,奇数索引为高亮内容
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = part.match(/^\{([^}]+)\}$/);
        if (match) {
          return (
            <span
              key={i}
              className="font-semibold text-violet-300"
            >
              {match[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
