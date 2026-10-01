import { Link } from "react-router-dom";
import { products } from "../data/companyData";

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>The right cover, at the right time.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-3">
          {products.map((p) => (
            <div key={p.name} className="box">
              <div className="icon">{p.icon}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <ul className="tick-list">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-maroon">
                Get a quote
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
