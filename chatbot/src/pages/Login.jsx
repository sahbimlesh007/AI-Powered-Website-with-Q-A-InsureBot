import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = email.split("@")[0];
    onLogin(name.charAt(0).toUpperCase() + name.slice(1));
    navigate("/");
  };

  return (
    <section className="login-wrap">
      <div className="login-card">
        <div className="logo-mark big">D</div>
        <h2>Welcome back</h2>
        <p className="muted">Login to your Devansh account</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-maroon">
            Login
          </button>
        </form>

        <p className="muted small">
          New here?{" "}
          <Link to="/contact" className="link">
            Contact us
          </Link>{" "}
          to get started.
        </p>
      </div>
    </section>
  );
}
