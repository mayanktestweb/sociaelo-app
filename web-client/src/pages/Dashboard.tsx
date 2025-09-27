import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useWeb3 } from '../contexts/Web3Context'
import DashboardHome from './dashboard/DashboardHome'
import Create from './dashboard/Create'
import Profile from './dashboard/Profile'

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { account, balance, disconnectWallet, isConnected } = useWeb3()

  // Redirect to home if not connected
  if (!isConnected) {
    navigate('/')
    return null
  }

  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/dashboard' || path === '/dashboard/') return 'home'
    if (path.includes('/dashboard/create')) return 'create'
    if (path.includes('/dashboard/profile')) return 'profile'
    return 'home'
  }

  const activeTab = getActiveTab()

  const handleDisconnect = () => {
    disconnectWallet()
    navigate('/')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f1a 50%, #0f0a1a 100%)',
      paddingBottom: '80px' // Space for bottom nav
    }}>
      {/* Header with Web3 Info */}
      <div style={{
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 69, 255, 0.3)',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ 
              color: '#8b45ff', 
              fontSize: '0.9rem', 
              margin: '0 0 4px 0',
              fontWeight: '600'
            }}>
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}
            </p>
            <p style={{ 
              color: '#00d4ff', 
              fontSize: '0.8rem', 
              margin: 0 
            }}>
              {balance} ETH
            </p>
          </div>
          <button
            onClick={handleDisconnect}
            style={{
              background: 'rgba(255, 107, 53, 0.2)',
              border: '1px solid rgba(255, 107, 53, 0.4)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#ff6b35',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: window.innerWidth > 768 ? '33.333vw' : '100vw',
        minWidth: window.innerWidth > 768 ? '400px' : 'auto',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139, 69, 255, 0.3)',
        padding: '12px 0',
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Home Button */}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? '#8b45ff' : '#666',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              transition: 'all 0.3s ease',
              transform: activeTab === 'home' ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '24px' }}>🏠</div>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Home</span>
          </button>

          {/* Create Button (Floating) */}
          <button
            onClick={() => navigate('/dashboard/create')}
            style={{
              background: activeTab === 'create' 
                ? 'linear-gradient(45deg, #8b45ff, #00d4ff)' 
                : 'linear-gradient(45deg, #8b45ff, #00d4ff)',
              border: 'none',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'white',
              boxShadow: activeTab === 'create' 
                ? '0 8px 25px rgba(139, 69, 255, 0.6)' 
                : '0 4px 15px rgba(139, 69, 255, 0.4)',
              transition: 'all 0.3s ease',
              transform: activeTab === 'create' ? 'translateY(-8px) scale(1.1)' : 'translateY(-4px)',
              position: 'relative',
              zIndex: 10
            }}
          >
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>+</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => navigate('/dashboard/profile')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'profile' ? '#8b45ff' : '#666',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              transition: 'all 0.3s ease',
              transform: activeTab === 'profile' ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div style={{ fontSize: '24px' }}>👤</div>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
