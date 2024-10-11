import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import { FormProvider } from './utils/FormContext'
import OrderSuccessPage from './pages/OrderSuccessPage'

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/order-success" element={<OrderSuccessPage/>} />
        </Routes>
      </Router>
    </FormProvider>
  )
}

export default App
