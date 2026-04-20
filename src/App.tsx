import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './components/route/route'
import { AuthProvider } from './contexts/auth-context'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
