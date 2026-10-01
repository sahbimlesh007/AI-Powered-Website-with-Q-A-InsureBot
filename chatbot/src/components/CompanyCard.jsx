export default function CompanyCard({ label, value }) {
  return (
    <div className="card">
      <p className="card-label">{label}</p>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}
