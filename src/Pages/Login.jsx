import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserAuthenticationContext";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated, error, rejected } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { navigate: true });
    }
  }, [navigate, isAuthenticated, rejected]);
  function handleLogin(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && (
          <div>
            <span>Please enter valid email or password 😉</span>
          </div>
        )}
        <div>
          <button
            type="primary"
            style={{
              backgroundColor: "#00c46a", // Primary color
              color: "#fff", // Text color
              padding: "1rem 1rem", // Padding
              border: "none", // No border
              borderRadius: "0.5rem", // Rounded corners
              cursor: "pointer", // Cursor style
            }}
          >
            LOGIN
          </button>
        </div>
      </form>
    </main>
  );
}
