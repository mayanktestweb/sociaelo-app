import { useWeb3 } from '../../contexts/Web3Context'

function Profile() {
  const { account, balance } = useWeb3()

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        background: 'linear-gradient(45deg, #8b45ff, #00d4ff)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem'
      }}>
        Profile
      </h1>
      
      {/* Profile Header */}
      <div style={{
        background: 'rgba(139, 69, 255, 0.1)',
        border: '1px solid rgba(139, 69, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #8b45ff, #00d4ff)',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem'
        }}>
          👤
        </div>
        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
          {account ? `${account.slice(0, 8)}...${account.slice(-6)}` : 'Web3 User'}
        </h3>
        <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'monospace' }}>
          {account || '0x1234...5678'}
        </p>
        
        <button 
          className="neon-button" 
          style={{ 
            marginTop: '1rem',
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
          }}
        >
          Edit Profile
        </button>
      </div>
      
      {/* Stats */}
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>📈 Your Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div style={{
            background: 'rgba(139, 69, 255, 0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.5rem', color: '#8b45ff' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Following</div>
          </div>
          <div style={{
            background: 'rgba(0, 212, 255, 0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.5rem', color: '#00d4ff' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Followers</div>
          </div>
          <div style={{
            background: 'rgba(255, 107, 53, 0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.5rem', color: '#ff6b35' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Posts</div>
          </div>
          <div style={{
            background: 'rgba(139, 69, 255, 0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '1.5rem', color: '#8b45ff' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>NFTs</div>
          </div>
        </div>
      </div>
      
      {/* Wallet Section */}
      <div style={{
        background: 'rgba(255, 107, 53, 0.1)',
        border: '1px solid rgba(255, 107, 53, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ color: '#ff6b35', marginBottom: '1rem' }}>💰 Wallet</h3>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Balance: {balance} ETH</p>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Social Tokens: 0 SOC</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="neon-button" style={{ flex: 1 }}>
            Top Up
          </button>
          <button 
            className="neon-button" 
            style={{ 
              flex: 1,
              background: 'linear-gradient(45deg, #00d4ff, #8b45ff)'
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
