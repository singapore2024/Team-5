
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 
  const { currentUser, login } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    try {
      setLoading(true);
      await login(email, password);
      alert("Login successful");
      navigate("/home"); 
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Capture email input
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Capture password input
          required
        />
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
