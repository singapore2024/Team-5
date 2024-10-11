// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./parts/Header"; // Import the Header component
import SchedulePage from "./pages/SchedulePage";
import Menu from "./pages/Menu";
//import AdminPage from "./pages/Admin";
//import OrdersPage from "./pages/Orders";
import "./App.css"; // Include your global styles

function App() {
  return (
    <Router>
      {/* Render the Header component */}
      <Header title="Fortitude Culina" />
      <div > {/* Adjust the content to account for the sidebar */}
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
