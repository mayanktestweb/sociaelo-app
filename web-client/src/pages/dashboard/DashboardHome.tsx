import { useWeb3 } from '../../contexts/Web3Context'
import { useUser } from '../../contexts/UserContext'

function DashboardHome() {
  const { account, balance, chainId } = useWeb3()
  const { nullifier, gender, isLoading: isUserLoading } = useUser()

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet'
      case 11155111: return 'Sepolia Testnet'
      case 137: return 'Polygon Mainnet'
      case 80001: return 'Polygon Mumbai'
      default: return `Chain ID: ${chainId}`
    }
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        background: 'linear-gradient(45deg, #8b45ff, #00d4ff)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem'
      }}>
        Dashboard
      </h1>
      
      {/* Wallet Info Card */}
      <div style={{
        background: 'rgba(139, 69, 255, 0.1)',
        border: '1px solid rgba(139, 69, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#8b45ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          💰 Wallet Info
        </h3>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#ccc' }}>Address:</span>
            <span style={{ color: '#00d4ff', fontFamily: 'monospace' }}>
              {account ? `${account.slice(0, 8)}...${account.slice(-6)}` : 'N/A'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#ccc' }}>Balance:</span>
            <span style={{ color: '#8b45ff', fontWeight: '600' }}>{balance} ETH</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#ccc' }}>Network:</span>
            <span style={{ color: '#ff6b35' }}>{getNetworkName(chainId)}</span>
          </div>
        </div>
      </div>
      
      {/* User Identity Data Card */}
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🔒 Identity Verification
        </h3>
        {isUserLoading ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#888',
            padding: '1rem'
          }}>
            <span style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid transparent',
              borderTop: '2px solid #00d4ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></span>
            Loading identity data...
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#ccc' }}>Nullifier:</span>
              <span style={{ color: '#00d4ff', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {nullifier ? `${nullifier.slice(0, 8)}...${nullifier.slice(-6)}` : 'Not available'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#ccc' }}>Gender:</span>
              <span style={{ color: '#8b45ff', fontWeight: '600' }}>
                {gender || 'Not specified'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#ccc' }}>Verification:</span>
              <span style={{ color: nullifier ? '#00ff88' : '#888' }}>
                {nullifier ? '✓ Verified' : 'Not verified'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gap: '1rem', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(139, 69, 255, 0.1)',
          border: '1px solid rgba(139, 69, 255, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#8b45ff', marginBottom: '1rem' }}>📊 Analytics</h3>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>View your social metrics and engagement</p>
        </div>
        
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>🌟 Recent Activity</h3>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Latest interactions and updates</p>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(255, 107, 53, 0.1)',
        border: '1px solid rgba(255, 107, 53, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '1rem'
      }}>
        <h3 style={{ color: '#ff6b35', marginBottom: '1rem' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="neon-button" style={{ flex: 1, minWidth: '120px' }}>
            New Post
          </button>
          <button 
            className="neon-button" 
            style={{ 
              flex: 1, 
              minWidth: '120px',
              background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
            }}
          >
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
