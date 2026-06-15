import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Keormel",
  role: "Веб-разработчик · Full-stack",
  bio: "Создаю современные сайты и веб-приложения, ботов на Python. Люблю чистый код и продуманный UI. Открыт к новым проектам и коллаборациям.",
  status: "Открыт к работе",
  location: "Кишинёв, MD",
  tags: ["React", "Next.js", "TypeScript", "Node.js","Python", "Tailwind", "SQL", "Git"],

  skills: [
    { name: "React / Next.js", level: 90 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js / Express", level: 75 },
    { name: "CSS / Tailwind", level: 85 },
    { name: "Python", level: 70 },
    { name: "SQL", level: 65 },
  ],

  stack: [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "🟢" },
    { name: "Git", icon: "🌿" },
    { name: "SQL", icon: "🗄️" },
  ],

  contacts: [
    { label: "Telegram", href: "https://t.me/keormel", icon: "✈️" },
    { label: "GitHub", href: "https://github.com/keormel", icon: "🐙" },
    { label: "Email", href: "mailto:nanualex0716@gmail.com", icon: "✉️" },
  ],

  portfolioPath: "/portfolio",
};

// ─── THEME ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0f0f0f",
    bg2: "#1a1a1a",
    bg3: "#252525",
    text: "#f0f0f0",
    text2: "#888",
    border: "rgba(255,255,255,0.07)",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
    accentBg: "rgba(124,58,237,0.12)",
  },
  light: {
    bg: "#f2f2ee",
    bg2: "#ffffff",
    bg3: "#eaeae6",
    text: "#111",
    text2: "#666",
    border: "rgba(0,0,0,0.08)",
    accent: "#7c3aed",
    accentLight: "#6d28d9",
    accentBg: "rgba(124,58,237,0.07)",
  },
};

// ─── CLOCK ───────────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ name, level, t }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setWidth(level), 200);
    return () => clearTimeout(id);
  }, [level]);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
        <span style={{ color: t.text }}>{name}</span>
        <span style={{ color: t.text2 }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: t.bg3, borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${t.accent}, ${t.accentLight})`,
            borderRadius: 2,
            transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── CELL ────────────────────────────────────────────────────────────────────
function Cell({ children, style = {}, t, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.bg2,
        border: `0.5px solid ${hovered ? "rgba(124,58,237,0.35)" : t.border}`,
        borderRadius: 16,
        padding: "20px",
        transition: "transform 0.15s, border 0.2s, background 0.3s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── LABEL ───────────────────────────────────────────────────────────────────
function Label({ children, t }) {
  return (
    <div style={{
      fontSize: 11,
      color: t.text2,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;
  const clock = useClock();
  const d = DATA;

  const containerStyle = {
    minHeight: "100vh",
    background: t.bg,
    padding: "24px 16px",
    transition: "background 0.3s",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "auto",
    gap: 12,
    maxWidth: 900,
    margin: "0 auto",
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>

        {/* BIO — 2×2 */}
        <Cell t={t} style={{ gridColumn: "span 2", gridRow: "span 2" }}>
          <Label t={t}>About me</Label>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: `linear-gradient(135deg, ${t.accent}, #ec4899)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              {d.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: t.text, marginBottom: 2 }}>{d.name}</div>
              <div style={{ fontSize: 13, color: t.text2 }}>{d.role}</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: t.text2, lineHeight: 1.7, marginBottom: 14 }}>{d.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
            {d.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 11, padding: "2px 8px", borderRadius: 6,
                background: `rgba(124,58,237,0.14)`, color: t.accentLight,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: t.text2 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
              display: "inline-block", marginRight: 8,
              animation: "pulse 2s infinite",
            }} />
            {d.status}
          </div>
        </Cell>

        {/* SKILLS — 2×1 */}
        <Cell t={t} style={{ gridColumn: "span 2" }}>
          <Label t={t}>Skills</Label>
          {d.skills.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} t={t} />
          ))}
        </Cell>

        {/* CONTACTS — 1×1 */}
        <Cell t={t} style={{ gridColumn: "span 1" }}>
          <Label t={t}>Contacts</Label>
          {d.contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 10px", borderRadius: 10,
                background: t.bg3, color: t.text,
                textDecoration: "none", fontSize: 13,
                marginBottom: 7, transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.background = t.bg3}
            >
              <span>{c.icon}</span> {c.label}
            </a>
          ))}
        </Cell>

        {/* CLOCK — 1×1 */}
        <Cell t={t} style={{ gridColumn: "span 1" }}>
          <Label t={t}>Local time</Label>
          <div style={{ fontSize: 26, fontWeight: 600, color: t.text, letterSpacing: "0.02em", marginBottom: 4 }}>
            {clock}
          </div>
          <div style={{ fontSize: 12, color: t.text2 }}>{d.location}</div>
        </Cell>

        {/* PORTFOLIO — 2×1 */}
        <Cell
          t={t}
          style={{
            gridColumn: "span 2",
            background: `linear-gradient(135deg, rgba(124,58,237,0.13), rgba(236,72,153,0.07))`,
          }}
          onClick={() => window.location.href = d.portfolioPath}
        >
          <Label t={t}>Portfolio</Label>
          <div style={{ fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 4 }}>Мои работы</div>
          <div style={{ fontSize: 13, color: t.text2, marginBottom: 14 }}>
            Веб-сайты, лендинги и приложения — смотри все проекты
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", borderRadius: 10,
            background: t.accent, color: "#fff",
            fontSize: 14, fontWeight: 500,
          }}>
            Смотреть все проекты <span>→</span>
          </div>
        </Cell>

        {/* STACK — 1×1 */}
        <Cell t={t} style={{ gridColumn: "span 1" }}>
          <Label t={t}>Stack</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {d.stack.map((s) => (
              <div key={s.name} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 12, color: t.text2,
                padding: "5px 8px", background: t.bg3, borderRadius: 8,
              }}>
                <span>{s.icon}</span> {s.name}
              </div>
            ))}
          </div>
        </Cell>

        {/* THEME — 1×1 */}
        <Cell t={t} style={{ gridColumn: "span 1" }}>
          <Label t={t}>Theme</Label>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              width: "100%", padding: "10px", borderRadius: 10,
              border: `0.5px solid ${t.border}`,
              background: t.bg3, color: t.text,
              fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.background = t.bg3}
          >
            {isDark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
          <div style={{ fontSize: 12, color: t.text2, marginTop: 12, textAlign: "center" }}>
            © {new Date().getFullYear()} {d.name}
          </div>
        </Cell>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 420px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
        * { box-sizing: border-box; }
        a { cursor: pointer; }
      `}</style>
    </div>
  );
}
