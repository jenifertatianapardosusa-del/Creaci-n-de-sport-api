export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__dot" />
      <span className="loader__dot" />
      <span className="loader__dot" />
      <span className="loader__label">Consultando el marcador…</span>
    </div>
  );
}