export function ProjectVisual({ project, large = false }) {
  const className = `project-preview${large ? " project-preview-large" : ""}${project.logo ? " has-logo" : ""}`;
  const background = project.logoBackground || project.color || "var(--chip-bg)";
  const logoFit = project.logoFit || "cover";

  return (
    <div className={className} style={{ background, "--project-logo-fit": logoFit }}>
      {project.logo ? (
        <img src={project.logo} alt={project.logoAlt || `${project.title} logo`} />
      ) : project.icon ? (
        <i className={`ti ${project.icon}`} />
      ) : (
        <span className="project-preview-letter">{project.title[0]}</span>
      )}
    </div>
  );
}
