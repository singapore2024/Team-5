import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdminDashboard from './pages/AdminDashboard';  // Import the AdminDashboard
import SchedulePage from "./pages/SchedulePage";
import Menu from "./pages/Menu";
import Navbar from './pages/navbar';  // Import Navbar
import { FormProvider } from './utils/FormContext';  // Import FormProvider
import "./App.css"; // Include your global styles

function App() {
  return (
    <FormProvider>
      <Router>
        {/* Navbar wraps the routes so it is persistent across all pages */}
        <Navbar>
          <Routes>
            {/* Define your routes here */}
            <Route path="/dashboard" element={<Menu />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            {/* Catch-all route for undefined pages */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Navbar>
      </Router>
    </FormProvider>
  );
}

export default App;
