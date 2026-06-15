import { projects } from "../data.js";
import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { Tag } from "../components/Tag.jsx";

export function PortfolioPage({ t, onBackHome, onOpenProject }) {
  return (
    <div className="page-shell">
      <div className="page-head">
        <div>
          <SectionLabel icon="layout-grid" t={t}>
            Проекты
          </SectionLabel>
          <h1 className="page-title">Портфолио</h1>
          <p className="page-subtitle">Подборка работ с коротким описанием, стеком и отдельной страницей для каждого кейса.</p>
        </div>
        <button className="back-button" onClick={onBackHome}>
          <i className="ti ti-arrow-left" />
          <span>Назад</span>
        </button>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <Cell key={project.id} delay={index} style={{ gridColumn: "span 2" }} onClick={() => onOpenProject(project.id)}>
            <div className="project-card-top">
              <div className="project-preview" style={{ background: project.color }}>
                <i className={`ti ${project.icon}`} />
              </div>
              <div>
                <div className="project-year">{project.year || "2025"}</div>
                <div className="project-role">{project.role || "Front-end"}</div>
              </div>
            </div>

            <div className="project-title">{project.title}</div>
            <div className="project-desc">{project.desc}</div>

            <div className="tag-row">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="card-footer">
              <span>Открыть кейс</span>
              <i className="ti ti-arrow-right" />
            </div>
          </Cell>
        ))}
      </div>
    </div>
  );
}
