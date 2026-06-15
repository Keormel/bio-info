import { bio, contacts } from "../data.js";
import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { Tag } from "../components/Tag.jsx";
import { ProjectVisual } from "../components/ProjectVisual.jsx";

export function ProjectPage({ t, project, onBackToPortfolio, onBackHome }) {
  const telegramUrl = contacts.find((contact) => contact.label === "Telegram")?.url || "#";
  const photosUrl = project.photosUrl || telegramUrl;

  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <SectionLabel icon="stack" t={t}>
            Кейс
          </SectionLabel>
        </div>
        <button className="back-button" onClick={onBackToPortfolio}>
          <i className="ti ti-arrow-left" />
          <span>Назад</span>
        </button>
      </div>

      <div className="project-grid">
        <Cell delay={0} style={{ gridColumn: "span 12" }}>
          <div className="project-hero">
            <ProjectVisual project={project} large />
            <div className="project-hero-text">
              <div className="project-meta-line">
                <span>{project.date || project.year || "2025"}</span>
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

        <Cell style={{ gridColumn: "span 6" }} delay={1}>
          <SectionLabel icon="report-search" t={t}>
            Задача
          </SectionLabel>
          <p className="detail-text">{project.challenge}</p>
        </Cell>

        <Cell style={{ gridColumn: "span 6" }} delay={2}>
          <SectionLabel icon="target-arrow" t={t}>
            Результат
          </SectionLabel>
          <p className="detail-text">{project.result}</p>
        </Cell>

        <Cell style={{ gridColumn: "span 6" }} delay={3}>
          <SectionLabel icon="chart-bar" t={t}>
            Стек
          </SectionLabel>
          <div className="tag-row">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </Cell>

        <Cell style={{ gridColumn: "span 6" }} delay={4}>
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

        <Cell style={{ gridColumn: "span 12" }} delay={5}>
          <SectionLabel icon="photo" t={t}>
            Фотографии
          </SectionLabel>
          <div className="detail-author">
            <p className="detail-text" style={{ margin: 0 }}>
              Посмотреть фотографии проекта в Telegram.
            </p>
            <a href={photosUrl} target="_blank" rel="noreferrer" className="inline-button">
              <i className="ti ti-photo" />
              <span>Фотографии проекта</span>
            </a>
          </div>
        </Cell>

        <Cell style={{ gridColumn: "span 12" }} delay={6}>
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
