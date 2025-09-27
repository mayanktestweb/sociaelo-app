import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3 } from '../contexts/Web3Context'
import { useUser } from '../contexts/UserContext'
import {SelfQRcodeWrapper, SelfAppBuilder} from '@selfxyz/qrcode'

function Home() {
  const navigate = useNavigate()
  const { 
    connectWallet, 
    isConnecting, 
    isConnected, 
    account, 
    error 
  } = useWeb3()

  const { fetchUserData, isLoading: isUserLoading } = useUser()

  const [selfApp, setSelfApp] = useState<any | null>(null)

  useEffect(() => {
    if (!isConnected || !account) {
      setSelfApp(null)
      return
    }
    
    const userId = account.toString();
    
    const app = new SelfAppBuilder({
      version: 2,
      appName: import.meta.env.NEXT_PUBLIC_SELF_APP_NAME || 'Self Docs',
      scope: 'mayanktestingselfxyzone',
      endpoint: '0x0c511562f5542e2091fd776704c08bd27ac17475',
      logoBase64: 'https://i.postimg.cc/mrmVf9hm/self.png',
      userId,
      endpointType: 'staging_celo',
      userIdType: 'hex', // 'hex' for EVM address or 'uuid' for uuidv4
      userDefinedData: 'Hello from the Docs!!',
      disclosures: {
        // What you want to verify from the user's identity
        minimumAge: 18,
        // excludedCountries: [countries.CUBA, countries.IRAN, countries.NORTH_KOREA, countries.RUSSIA],
        excludedCountries: [],
        ofac: false,

        // What you want users to
        nationality: true,
        gender: true,
      },
    }).build()

    setSelfApp(app)
  }, [account, isConnected])

  const handleConnect = async () => {
    await connectWallet()
  }

  const handleSuccessfulVerification = () => {
    // Persist the attestation / session result to your backend, then gate content
    console.log('Verified!')
    
    if (account) {
      try {
        fetchUserData(account)
        navigate('/dashboard')
      } catch (error) {
        console.log("Failed to fetch user data:", error)
        // Still navigate to dashboard even if user data fetch fails
        navigate('/dashboard')
      }
    } else {
      navigate('/dashboard')
    }
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

        {selfApp && (
          <div style={{
            marginTop: '2rem',
            background: 'rgba(139, 69, 255, 0.1)',
            border: '1px solid rgba(139, 69, 255, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#8b45ff',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '1rem',
              margin: 0
            }}>
              Scan QR Code by Self.xyz app in mobile
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem'
            }}>
              <SelfQRcodeWrapper
                selfApp={selfApp}
                onSuccess={handleSuccessfulVerification}
                onError={() => {
                  console.error('Error: Failed to verify identity')
                }}
              />
              
              {isUserLoading && (
                <div style={{
                  marginTop: '1rem',
                  color: '#00d4ff',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid transparent',
                    borderTop: '2px solid #00d4ff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Fetching user data...
                </div>
              )}
            </div>
          </div>
        )}

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