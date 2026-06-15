import { useState } from "react";

export function Cell({ children, style = {}, onClick, delay = 0, className = "" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cell ${className}`.trim()}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? "rgba(124,58,237,0.3)" : undefined,
        transform: hovered ? "translateY(-2px)" : undefined,
        cursor: onClick ? "pointer" : "default",
        animationDelay: `${delay * 70}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
