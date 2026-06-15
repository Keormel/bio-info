import { bio } from "../data.js";
import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { Tag } from "../components/Tag.jsx";

export function ProjectPage({ t, project, onBackToPortfolio, onBackHome }) {
  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <SectionLabel icon="stack" t={t}>
            Кейс
          </SectionLabel>
          <h1 className="page-title">{project.title}</h1>
          <p className="page-subtitle">{project.long}</p>
        </div>
        <button className="back-button" onClick={onBackToPortfolio}>
          <i className="ti ti-arrow-left" />
          <span>Назад</span>
        </button>
      </div>

      <div className="project-grid">
        <Cell delay={0} style={{ gridColumn: "span 4" }}>
          <div className="project-hero">
            <div className="project-preview project-preview-large" style={{ background: project.color }}>
              <i className={`ti ${project.icon}`} />
            </div>
            <div className="project-hero-text">
              <div className="project-meta-line">
                <span>{project.year || "2025"}</span>
                <span>{project.role || "Front-end"}</span>
              </div>
              <div className="project-title large">{project.title}</div>
              <div className="project-desc">{project.desc}</div>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className="inline-actions">
                <a href={project.url} target="_blank" rel="noreferrer" className="inline-button">
                  <i className="ti ti-external-link" />
                  <span>Открыть сайт</span>
                </a>
                <a href={project.repo} target="_blank" rel="noreferrer" className="inline-button secondary">
                  <i className="ti ti-brand-github" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </Cell>

        <Cell style={{ gridColumn: "span 2" }} delay={1}>
          <SectionLabel icon="report-search" t={t}>
            Задача
          </SectionLabel>
          <p className="detail-text">{project.challenge}</p>
        </Cell>

        <Cell style={{ gridColumn: "span 2" }} delay={2}>
          <SectionLabel icon="target-arrow" t={t}>
            Результат
          </SectionLabel>
          <p className="detail-text">{project.result}</p>
        </Cell>

        <Cell style={{ gridColumn: "span 2" }} delay={3}>
          <SectionLabel icon="chart-bar" t={t}>
            Стек
          </SectionLabel>
          <div className="tag-row">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </Cell>

        <Cell style={{ gridColumn: "span 2" }} delay={4}>
          <SectionLabel icon="sparkles" t={t}>
            Возможности
          </SectionLabel>
          <div className="feature-list">
            {project.features.map((feature) => (
              <div key={feature} className="feature-row">
                <i className="ti ti-check" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Cell>

        <Cell style={{ gridColumn: "span 4" }} delay={5}>
          <SectionLabel icon="user-circle" t={t}>
            Автор
          </SectionLabel>
          <div className="detail-author">
            <div>
              <div className="detail-author-name">{bio.name}</div>
              <div className="detail-author-role">{bio.role}</div>
            </div>
            <button className="back-button subtle" onClick={onBackHome}>
              <i className="ti ti-home" />
              <span>На главную</span>
            </button>
          </div>
        </Cell>
      </div>
    </div>
  );
}
