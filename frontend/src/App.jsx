import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    // </AuthProvider>
  )
}

export default App
