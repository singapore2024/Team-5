import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import axios from "axios";
import "../App.css";

const HomePage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  // Example Axios request 
  // Can use this to check if you are connect to the server
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const token = currentUser && (await currentUser.getIdToken());
        const header = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get("http://localhost:3000", header);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAPI();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      alert("You have been logged out!");
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.error)
      setError("Something went wrong. Please try again.");
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Home Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogout} style={{ marginTop: "10px" }} disabled={loading}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
