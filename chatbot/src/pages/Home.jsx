import { Link } from "react-router-dom";
import CompanyCard from "../components/CompanyCard";
import { company, products, whyUs, steps, kpi } from "../data/companyData";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">INSURANCE ADVISORY</p>
          <h1>Insurance decisions you can make with confidence.</h1>
          <p className="hero-sub">{company.description}</p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-gold">
              Explore Services
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why choose Devansh</h2>
          <div className="grid grid-4">
            {whyUs.map((w) => (
              <div key={w.title} className="box center">
                <div className="icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">What we cover</h2>
          <div className="grid grid-3">
            {products.map((p) => (
              <div key={p.name} className="box">
                <div className="icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <Link to="/services" className="link">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="grid grid-3">
            {steps.map((s, i) => (
              <div key={s.title} className="box step">
                <span className="step-no">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="section kpi">
        <div className="container">
          <h2 className="section-title">Trusted by families and businesses</h2>
          <div className="kpi-wrap">
            <CompanyCard label={kpi.label} value={kpi.value} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-inner">
          <h2>Not sure which plan is right for you?</h2>
          <Link to="/contact" className="btn btn-gold">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
