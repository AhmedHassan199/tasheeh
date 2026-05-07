// Tiny renderer that turns custom inline tags inside i18n strings
// into React nodes. Supports:
//   <accent>...</accent>  -> highlighted span (orange gradient)
//   <br/>                 -> hard break
// We use a hand-rolled parser instead of dangerouslySetInnerHTML
// to keep the strings safe and to allow real React components.

const TOKEN_RE = /(<accent>.*?<\/accent>|<br\s*\/?>(?:\s*))/g;

export function RichText({ text, className = '' }) {
  if (!text) return null;
  const parts = text.split(TOKEN_RE).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (/^<br\s*\/?>(?:\s*)$/.test(part)) return <br key={i} />;
        const m = part.match(/^<accent>(.*?)<\/accent>$/);
        if (m) {
          return (
            <span key={i} className="text-flame-gradient">
              {m[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
