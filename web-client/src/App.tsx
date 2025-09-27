import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Web3Provider } from './contexts/Web3Context'
import { UserProvider } from './contexts/UserContext'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserPage from './pages/UserPage'
import './App.css'

function App() {
  return (
    <Web3Provider>
      <UserProvider>
        <Router>
          <div className="App">
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </UserProvider>
    </Web3Provider>
  )
}

export default App
