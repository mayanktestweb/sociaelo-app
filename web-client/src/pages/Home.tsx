import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3 } from '../contexts/Web3Context'

function Home() {
  const navigate = useNavigate()
  const { 
    connectWallet, 
    isConnecting, 
    isConnected, 
    account, 
    error 
  } = useWeb3()

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard')
    }
  }, [isConnected, navigate])

  const handleConnect = async () => {
    await connectWallet()
  }

  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f1a 50%, #0f0a1a 100%)'
    }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          background: 'linear-gradient(45deg, #8b45ff, #00d4ff)', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Welcome to Sociaelo
        </h1>
        <p style={{ 
          color: '#888', 
          fontSize: '1.2rem',
          marginBottom: '2rem',
          maxWidth: '400px',
          lineHeight: '1.6'
        }}>
          Connect your Web3 wallet to enter the decentralized social experience
        </p>
        
        {account && (
          <div style={{
            background: 'rgba(139, 69, 255, 0.1)',
            border: '1px solid rgba(139, 69, 255, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{ color: '#8b45ff', fontSize: '0.9rem', margin: 0 }}>
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(255, 107, 53, 0.1)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{ color: '#ff6b35', fontSize: '0.9rem', margin: 0 }}>
              {error}
            </p>
            {error.includes('MetaMask') && (
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  display: 'inline-block'
                }}
              >
                Download MetaMask →
              </a>
            )}
          </div>
        )}
      </div>
      
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="neon-button" 
          style={{ 
            width: '100%',
            padding: '16px 24px',
            fontSize: '1.1rem',
            opacity: isConnecting ? 0.7 : 1,
            cursor: isConnecting ? 'not-allowed' : 'pointer'
          }}
        >
          {isConnecting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
              Connecting...
            </span>
          ) : 'Connect Wallet'}
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Home