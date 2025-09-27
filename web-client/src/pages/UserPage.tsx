import { Link } from 'react-router-dom'

function UserPage() {
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f1a 50%, #0f0a1a 100%)'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/dashboard" 
          style={{ 
            color: '#8b45ff', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <h1 style={{ 
        fontSize: '2rem', 
        background: 'linear-gradient(45deg, #8b45ff, #00d4ff)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem'
      }}>
        User Profile
      </h1>
      
      <div style={{
        background: 'rgba(139, 69, 255, 0.1)',
        border: '1px solid rgba(139, 69, 255, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #8b45ff, #00d4ff)',
          margin: '0 auto 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem'
        }}>
          👤
        </div>
        
        <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Welcome to Your Profile</h2>
        <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2rem' }}>
          This is where your detailed user information will be displayed
        </p>
        
        <p style={{ 
          color: '#ccc', 
          fontSize: '0.9rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          🚧 Profile customization and detailed view coming soon!
        </p>
        
        <button 
          className="neon-button"
          style={{ 
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
          }}
        >
          Customize Profile
        </button>
      </div>
    </div>
  )
}

export default UserPage
