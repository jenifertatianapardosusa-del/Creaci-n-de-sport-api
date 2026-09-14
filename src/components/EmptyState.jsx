export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark">0—0</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}