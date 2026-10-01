import { Link } from "react-router-dom";
import { company } from "../data/companyData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>{company.name}</h4>
          <p>{company.tagline}</p>
          <p className="small">LLPIN: {company.llpin}</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>{company.address}</p>
          <p>{company.phone}</p>
          <p>{company.email}</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
        Bimlesh
      </div>
    </footer>
  );
}
