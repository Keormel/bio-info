import { Cell } from "../components/Cell.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";

export function NotFoundPage({ t, onBackHome, onBackToPortfolio }) {
  return (
    <div className="page-shell">
      <Cell style={{ maxWidth: 720, margin: "0 auto" }} delay={0}>
        <SectionLabel icon="alert-circle" t={t}>
          Не найдено
        </SectionLabel>
        <h1 className="page-title">Страница не найдена</h1>
        <p className="page-subtitle">Похоже, у этого проекта нет страницы. Вернись к списку или на главную.</p>
        <div className="inline-actions">
          <button className="inline-button" onClick={onBackToPortfolio}>
            <i className="ti ti-layout-grid" />
            <span>К проектам</span>
          </button>
          <button className="inline-button secondary" onClick={onBackHome}>
            <i className="ti ti-home" />
            <span>На главную</span>
          </button>
        </div>
      </Cell>
    </div>
  );
}
