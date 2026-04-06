import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/characters");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel parchment-panel">
        <div className="auth-header-bar" />
        <h2 className="auth-title">Enter the Realm</h2>
        <p className="auth-subtitle">Speak your credentials, traveller</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">Email</label>
          <input name="email" type="email" placeholder="your@email.com"
            value={form.email} onChange={handleChange} className="parchment-input" />

          <label className="auth-label">Password</label>
          <input name="password" type="password" placeholder="••••••••"
            value={form.password} onChange={handleChange} className="parchment-input" />

          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-primary btn-full">Enter</button>
        </form>

        <hr className="divider" />
        <p className="auth-footer">No account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
