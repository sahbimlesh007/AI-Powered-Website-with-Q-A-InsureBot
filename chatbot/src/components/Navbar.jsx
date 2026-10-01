import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/contact", "Contact"],
];

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>
          <span className="logo-mark">D</span>
          <span className="logo-text">
            Devansh<small>Insurance Broking</small>
          </span>
        </Link>

        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end onClick={close}>
              {label}
            </NavLink>
          ))}
          {user ? (
            <>
              <span className="nav-user">Hi, {user}</span>
              <button
                className="btn btn-gold"
                onClick={() => {
                  onLogout();
                  close();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-gold" onClick={close}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
