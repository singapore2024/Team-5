import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Menu from './pages/Menu'

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<Menu />} />
        </Routes>
      </Router>
    // </AuthProvider>
  )
}

export default App
