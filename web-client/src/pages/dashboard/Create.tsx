import { useState } from 'react'


function Create() {
  const [targetGender, setTargetGender] = useState('anyone')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [description, setDescription] = useState('');

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{
            background: 'rgba(0, 212, 255, 0.2)',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#00d4ff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}>
            📷 Photo
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
          </label>
          {selectedImage && (
            <span style={{
              color: '#00ff88',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ✓ {selectedImage.name}
            </span>
          )}
        </div>
        
        {/* Image Preview */}
        {selectedImage && (
          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#00d4ff', fontWeight: '500' }}>Selected Image</span>
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  background: 'rgba(255, 107, 53, 0.2)',
                  border: '1px solid rgba(255, 107, 53, 0.4)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#ff6b35',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Remove
              </button>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#ccc'
            }}>
              <div>📸 {selectedImage.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.25rem' }}>
                Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
        )}
        
        {/* Target Gender Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            color: '#8b45ff', 
            fontSize: '0.9rem', 
            fontWeight: '500', 
            marginBottom: '0.5rem',
            display: 'block'
          }}>
            Target Audience Gender
          </label>
          <select
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(139, 69, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
            value={targetGender}
            onChange={(e) => setTargetGender(e.target.value)}
          >
            <option value="anyone" style={{ background: '#1a1a1a' }}>Anyone</option>
            <option value="male" style={{ background: '#1a1a1a' }}>Male</option>
            <option value="female" style={{ background: '#1a1a1a' }}>Female</option>
          </select>
        </div>

        {/* Privacy Toggle */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem',
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          border: '1px solid rgba(139, 69, 255, 0.2)'
        }}>
          <div>
            <span style={{ color: '#8b45ff', fontWeight: '500' }}>Post Visibility</span>
            
          </div>
          <label style={{ 
            position: 'relative', 
            display: 'inline-block', 
            width: '50px', 
            height: '24px' 
          }}>
            <input 
              type="checkbox" 
              checked={isPublic}
              onChange={(e) => setIsPublic(!(e.target.checked))}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span 
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isPublic ? '#00d4ff' : '#666',
                borderRadius: '24px',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setIsPublic(!isPublic)}
            >
              <span style={{
                position: 'absolute',
                height: '18px',
                width: '18px',
                left: isPublic ? '26px' : '3px',
                top: '3px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}></span>
            </span>
          </label>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#888' }}>Status:</span>
          <span style={{ 
            color: isPublic ? '#00ff88' : '#ff6b35', 
            fontWeight: '500' 
          }}>
            {isPublic ? 'Public' : 'Private'}
          </span>
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
