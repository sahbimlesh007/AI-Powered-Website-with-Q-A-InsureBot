import { company, whyUs } from "../data/companyData";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>{company.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2 className="left-title">Who we are</h2>
            <p className="lead">
              {company.name} is an insurance advisory firm based in Bengaluru.
              We help individuals, families and businesses understand their
              risks and choose the right insurance cover.
            </p>
            <p className="lead">
              Our approach is simple: honest advice, clear explanations and real
              support when it matters most, at the time of a claim.
            </p>
          </div>

          <div className="box">
            <h3>Company Information</h3>
            <ul className="info-list">
              <li>
                <b>LLPIN:</b> {company.llpin}
              </li>
              <li>
                <b>Type:</b> {company.type}
              </li>
              <li>
                <b>Incorporated:</b> {company.incorporated}
              </li>
              <li>
                <b>Registrar:</b> {company.roc}
              </li>
              <li>
                <b>Status:</b> {company.status}
              </li>
              <li>
                <b>Designated Partner:</b> {company.designatedPartner}
              </li>
              <li>
                <b>Team Size:</b> {company.employees}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="section-title">Our values</h2>
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
    </>
  );
}
