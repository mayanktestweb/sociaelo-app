function Create() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        background: 'linear-gradient(45deg, #8b45ff, #00d4ff)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem'
      }}>
        Create Content
      </h1>
      
      <div style={{
        background: 'rgba(139, 69, 255, 0.1)',
        border: '1px solid rgba(139, 69, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#8b45ff', marginBottom: '1rem' }}>✨ What's on your mind?</h3>
        <textarea
          placeholder="Share your thoughts with the Web3 community..."
          style={{
            width: '100%',
            minHeight: '120px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(139, 69, 255, 0.2)',
            borderRadius: '12px',
            padding: '1rem',
            color: 'white',
            fontSize: '1rem',
            resize: 'vertical',
            marginBottom: '1rem'
          }}
        />
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            style={{
              background: 'rgba(0, 212, 255, 0.2)',
              border: '1px solid rgba(0, 212, 255, 0.4)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#00d4ff',
              cursor: 'pointer'
            }}
          >
            📷 Photo
          </button>
          <button 
            style={{
              background: 'rgba(255, 107, 53, 0.2)',
              border: '1px solid rgba(255, 107, 53, 0.4)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#ff6b35',
              cursor: 'pointer'
            }}
          >
            🎵 Audio
          </button>
          <button 
            style={{
              background: 'rgba(139, 69, 255, 0.2)',
              border: '1px solid rgba(139, 69, 255, 0.4)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#8b45ff',
              cursor: 'pointer'
            }}
          >
            🪙 NFT
          </button>
        </div>
        
        <button className="neon-button" style={{ width: '100%' }}>
          Publish to Blockchain
        </button>
      </div>
      
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>📊 Content Analytics</h3>
        <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Track your content performance and earnings
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', color: '#8b45ff' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Posts</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', color: '#00d4ff' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Likes</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', color: '#ff6b35' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Tokens</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
