// Renders {keywords} in a string as colored highlight spans
// Usage: <Highlight text="I'm {Eric}, I like {Web 3D}" />
export default function Highlight({ text, className = "" }) {
  if (!text) return null;
  // Split by {xxx}; odd indices are the highlighted content
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
