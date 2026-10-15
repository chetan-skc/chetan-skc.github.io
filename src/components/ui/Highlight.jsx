// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]

/** Renders `**text**` segments as highlighted <strong> elements. */
export function Highlight({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${index}-${part}`} className="font-[650] text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
