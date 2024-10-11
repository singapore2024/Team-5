import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import Menu from './pages/Menu'

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>
    // </AuthProvider>
  )
}

export default App
