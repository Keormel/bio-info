export function SectionLabel({ icon, children, t }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: t.text2,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 14,
      }}
    >
      <i className={`ti ti-${icon}`} style={{ fontSize: 14 }} />
      <span>{children}</span>
    </div>
  );
}
