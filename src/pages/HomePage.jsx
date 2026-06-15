import { bio, skills, stack, contacts } from "../data.js";
import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { SkillBar } from "../components/SkillBar.jsx";
import { Tag } from "../components/Tag.jsx";

export function HomePage({ t, clock, isDark, setIsDark, onGoToPortfolio }) {
  return (
    <div className="grid-shell">
      <Cell style={{ gridColumn: "span 2", gridRow: "span 2" }} delay={0}>
        <SectionLabel icon="user-circle" t={t}>
          Обо мне
        </SectionLabel>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
          <div className="avatar-box">{bio.name[0]}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: t.text, marginBottom: 2 }}>{bio.name}</div>
            <div style={{ fontSize: 13, color: t.text2 }}>{bio.role}</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: t.text2, lineHeight: 1.7, marginBottom: 16 }}>{bio.about}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {stack.slice(0, 4).map((item) => (
            <Tag key={item.name}>{item.name}</Tag>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: t.text2 }}>
          <span className="status-dot" />
          {bio.status}
        </div>
      </Cell>

      <Cell style={{ gridColumn: "span 2" }} delay={1}>
        <SectionLabel icon="line-dots" t={t}>
          Навыки
        </SectionLabel>
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} t={t} delay={index} />
        ))}
      </Cell>

      <Cell style={{ gridColumn: "span 1" }} delay={2}>
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

      <Cell style={{ gridColumn: "span 1" }} delay={3}>
        <SectionLabel icon="clock-hour-3" t={t}>
          Локальное время
        </SectionLabel>
        <div style={{ fontSize: 26, fontWeight: 600, color: t.text, letterSpacing: "0.02em", marginBottom: 4 }}>
          {clock}
        </div>
        <div style={{ fontSize: 12, color: t.text2 }}>{bio.location}</div>
      </Cell>

      <Cell style={{ gridColumn: "span 2" }} delay={4} onClick={onGoToPortfolio}>
        <SectionLabel icon="layout-grid" t={t}>
          Портфолио
        </SectionLabel>
        <div style={{ fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 4 }}>Все проекты</div>
        <div style={{ fontSize: 13, color: t.text2, marginBottom: 16 }}>
          Открыть страницу с подборкой работ и отдельными кейсами.
        </div>
        <div className="cta-row">
          <span>Смотреть проекты</span>
          <i className="ti ti-arrow-right" />
        </div>
      </Cell>

      <Cell style={{ gridColumn: "span 1" }} delay={5}>
        <SectionLabel icon="stack" t={t}>
          Стек
        </SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {stack.map((item) => (
            <div key={item.name} className="stack-pill">
              <i className={`ti ${item.icon}`} style={{ fontSize: 14 }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </Cell>

      <Cell style={{ gridColumn: "span 1" }} delay={6}>
        <SectionLabel icon="sun-moon" t={t}>
          Тема
        </SectionLabel>
        <button className="theme-button" onClick={() => setIsDark((value) => !value)}>
          <i className={`ti ti-${isDark ? "sun" : "moon"}`} style={{ fontSize: 15 }} />
          <span>{isDark ? "Светлая" : "Тёмная"} тема</span>
        </button>
        <div style={{ fontSize: 12, color: t.text2, marginTop: 12, textAlign: "center" }}>
          © {new Date().getFullYear()} {bio.name}
        </div>
      </Cell>
    </div>
  );
}
