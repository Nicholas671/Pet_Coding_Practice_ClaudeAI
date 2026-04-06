import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/characters");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.panel} className="parchment-panel">
        <div style={styles.headerBar} />
        <h2 style={styles.title}>Join the Realm</h2>
        <p style={styles.subtitle}>Forge your legend, adventurer</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username</label>
          <input
            name="username"
            placeholder="Your name in the realm"
            value={form.username}
            onChange={handleChange}
            className="parchment-input"
          />

          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="parchment-input"
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handleChange}
            className="parchment-input"
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary" style={styles.btn}>
            Begin Your Quest
          </button>
        </form>

        <hr className="divider" />
        <p style={styles.footer}>
          Already a member? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "24px",
    boxSizing: "border-box",
  },
  panel: {
    width: "100%",
    maxWidth: "400px",
    padding: "0 32px 32px",
    textAlign: "center",
  },
  headerBar: {
    height: "6px",
    background: "linear-gradient(90deg, #8b1a1a, #c9a84c, #8b1a1a)",
    margin: "0 -32px 28px",
    borderRadius: "4px 4px 0 0",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "1.8rem",
    color: "#2a1e10",
    margin: "0 0 4px",
  },
  subtitle: {
    color: "#7a6a50",
    fontStyle: "italic",
    margin: "0 0 24px",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },
  label: {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    color: "#5a3e20",
    marginBottom: "-4px",
  },
  btn: {
    marginTop: "8px",
    width: "100%",
  },
  footer: {
    fontSize: "0.95rem",
    color: "#7a6a50",
    margin: "0",
  },
};

export default Register;
