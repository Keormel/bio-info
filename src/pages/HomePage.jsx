import { bio, skills, stack, contacts } from "../data.js";
import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { SkillBar } from "../components/SkillBar.jsx";
import { Tag } from "../components/Tag.jsx";

export function HomePage({ t, clock, isDark, setIsDark, onGoToPortfolio }) {
  return (
    <div style={{ 
      display: "flex", 
      gap: "20px",
      height: "100%",
      alignItems: "flex-start"
    }}>
      {/* Left sidebar - Theme button */}
      <div style={{ flexShrink: 0 }}>
        <button 
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "12px",
            border: `0.5px solid ${t.border}`,
            background: t.bg3,
            color: t.text,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "11px",
            transition: "all 0.18s ease",
          }}
          onClick={() => setIsDark((value) => !value)}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <i className={`ti ti-${isDark ? "sun" : "moon"}`} style={{ fontSize: "22px" }} />
          <span>{isDark ? "Light" : "Dark"}</span>
        </button>
      </div>

      {/* Main content - Two columns */}
      <div style={{ display: "flex", gap: "20px", flex: 1, minWidth: 0 }}>
        
        {/* Left column - About + Skills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1.2 }}>
          {/* About info */}
          <Cell delay={0}>
            <SectionLabel icon="user-circle" t={t}>
              Обо мне
            </SectionLabel>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
              <div className="avatar-box">{bio.name[0]}</div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 600, color: t.text, marginBottom: 4 }}>{bio.name}</div>
                <div style={{ fontSize: 15, color: t.text2 }}>{bio.role}</div>
              </div>
            </div>
            <p style={{ fontSize: 16, color: t.text2, lineHeight: 1.7, marginBottom: 18 }}>{bio.about}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {stack.slice(0, 4).map((item) => (
                <Tag key={item.name}>{item.name}</Tag>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 14, color: t.text2 }}>
              <span className="status-dot" />
              {bio.status}
            </div>
          </Cell>

          {/* Skills */}
          <Cell delay={1}>
            <SectionLabel icon="line-dots" t={t}>
              Навыки
            </SectionLabel>
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} t={t} delay={index} />
            ))}
          </Cell>
        </div>

        {/* Middle column - Contacts + Time */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 0.9 }}>
          {/* Contacts */}
          <Cell delay={2}>
            <SectionLabel icon="mail" t={t}>
              Контакты
            </SectionLabel>
            {contacts.map((contact) => (
              <a key={contact.label} href={contact.url} className="soft-link" target="_blank" rel="noreferrer">
                <i className={`ti ${contact.icon}`} style={{ fontSize: 15 }} />
                <span>{contact.label}</span>
              </a>
            ))}
          </Cell>

          {/* Time */}
          <Cell delay={3}>
            <SectionLabel icon="clock-hour-3" t={t}>
              Локальное время
            </SectionLabel>
            <div style={{ fontSize: 34, fontWeight: 600, color: t.text, letterSpacing: "0.02em", marginBottom: 6 }}>
              {clock}
            </div>
            <div style={{ fontSize: 14, color: t.text2 }}>{bio.location}</div>
          </Cell>
        </div>

        {/* Right column - Stack + Portfolio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
          {/* Stack */}
          <Cell delay={5}>
            <SectionLabel icon="stack" t={t}>
              Стек
            </SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              {stack.map((item) => (
                <div key={item.name} className="stack-pill">
                  <i className={`ti ${item.icon}`} style={{ fontSize: 14 }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </Cell>

          {/* Portfolio */}
          <Cell delay={4} onClick={onGoToPortfolio}>
            <SectionLabel icon="layout-grid" t={t}>
              Портфолио
            </SectionLabel>
            <div style={{ fontSize: 24, fontWeight: 600, color: t.text, marginBottom: 8 }}>Все проекты</div>
            <div style={{ fontSize: 15, color: t.text2, marginBottom: 18 }}>
              Открыть страницу с подборкой работ и отдельными кейсами.
            </div>
            <div className="cta-row">
              <span>Смотреть проекты</span>
              <i className="ti ti-arrow-right" />
            </div>
          </Cell>
        </div>
      </div>
    </div>
  );
}
