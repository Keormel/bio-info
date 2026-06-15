import { useEffect, useState } from "react";

function useInitialActiveLevel(level, delay) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setWidth(level), 120 + delay * 40);

    return () => window.clearTimeout(id);
  }, [delay, level]);

  return width;
}

export function SkillBar({ name, level, t, delay }) {
  const width = useInitialActiveLevel(level, delay);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: t.text }}>{name}</span>
        <span style={{ color: t.text2 }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: t.bg3, borderRadius: 999, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: t.accent,
            borderRadius: 999,
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}
