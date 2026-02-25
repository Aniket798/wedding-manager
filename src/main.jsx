import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ExpenseProvider } from './context/ExpenseContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </StrictMode>
)