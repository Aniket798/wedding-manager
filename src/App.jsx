import { Routes, Route, Link } from 'react-router-dom'
import Expenses from './pages/Expenses'

function App() {
  return (
    <div>
      <nav>
        <Link to="/expenses">Expenses</Link>
      </nav>

      <Routes>
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </div>
  )
}

export default App
