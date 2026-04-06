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
    <div className="auth-page">
      <div className="auth-panel parchment-panel">
        <div className="auth-header-bar" />
        <h2 className="auth-title">Join the Realm</h2>
        <p className="auth-subtitle">Forge your legend, adventurer</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">Username</label>
          <input name="username" placeholder="Your name in the realm"
            value={form.username} onChange={handleChange} className="parchment-input" />

          <label className="auth-label">Email</label>
          <input name="email" type="email" placeholder="your@email.com"
            value={form.email} onChange={handleChange} className="parchment-input" />

          <label className="auth-label">Password</label>
          <input name="password" type="password" placeholder="Min. 8 characters"
            value={form.password} onChange={handleChange} className="parchment-input" />

          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-primary btn-full">Begin Your Quest</button>
        </form>

        <hr className="divider" />
        <p className="auth-footer">Already a member? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Register;
