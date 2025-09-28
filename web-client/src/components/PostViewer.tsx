import { useState, useEffect } from 'react'
import { useWeb3 } from '../contexts/Web3Context'
import { useUser } from '../contexts/UserContext'
import lighthouse from '@lighthouse-web3/sdk'

interface PostViewerProps {
  mediaCid: string
  textCid: string
  isPublic?: boolean
}

function PostViewer({ mediaCid, textCid, isPublic = false }: PostViewerProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [textContent, setTextContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const { account, signer } = useWeb3()
  const { nullifier } = useUser()

  console.log(mediaCid, textCid)



// Function to sign the authentication message using Web3Provider
  const signAuthMessage = async () => {
    if (!account || !signer) {
      console.error("Wallet not connected or signer not available")
      return null
    }

    try {
      const { message } = (await lighthouse.getAuthMessage(account)).data
      const signature = await signer.signMessage(message as string)
      
      return { signature, signerAddress: account }
    } catch (error) {
      console.error("Error signing message with Web3Provider", error)
      return null
    }
  }




  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        setIsLoading(true)
        setError('')

        // Fetch image from IPFS gateway
        const imageResponse = await fetch(`https://gateway.lighthouse.storage/ipfs/${mediaCid}`)
        if (imageResponse.ok) {
          const imageBlob = await imageResponse.blob()
          const imageObjectUrl = URL.createObjectURL(imageBlob)
          setImageUrl(imageObjectUrl)
        } else {
          throw new Error('Failed to load image')
        }

        // Fetch text content from IPFS gateway
        const textResponse = await fetch(`https://gateway.lighthouse.storage/ipfs/${textCid}`)
        if (textResponse.ok) {
          const text = await textResponse.text()
          setTextContent(text)
        } else {
          throw new Error('Failed to load text content')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post content')
        console.error('Error fetching post content:', err)
      } finally {
        setIsLoading(false)
      }
    }


    const fetchPrivatePostContent = async () => {
        try {
            // 
        } catch (error) {
            
        }
    }


    if (mediaCid && textCid) {
      fetchPostContent()
    }

    // Cleanup object URL when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [mediaCid, textCid, isPublic])

  if (isLoading) {
    return (
      <div style={{
        background: 'rgba(139, 69, 255, 0.1)',
        border: '1px solid rgba(139, 69, 255, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '1.5rem',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#8b45ff'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid transparent',
            borderTop: '2px solid #8b45ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading post...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        background: 'rgba(255, 107, 53, 0.1)',
        border: '1px solid rgba(255, 107, 53, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '1.5rem',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        color: '#ff6b35'
      }}>
        <p>❌ {error}</p>
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(139, 69, 255, 0.1)',
      border: '1px solid rgba(139, 69, 255, 0.3)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Post Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            fontSize: '1.2rem',
            color: '#8b45ff'
          }}>📸</span>
          <span style={{ color: '#8b45ff', fontSize: '0.9rem' }}>Post</span>
        </div>
        {!isPublic && (
          <span style={{
            background: 'rgba(255, 107, 53, 0.2)',
            color: '#ff6b35',
            padding: '0.25rem 0.5rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}>
            🔒 Private
          </span>
        )}
      </div>

      {/* Post Image */}
      {imageUrl && (
        <div style={{
          marginBottom: '1rem',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(139, 69, 255, 0.2)'
        }}>
          <img
            src={imageUrl}
            alt="Post content"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* Post Text */}
      {textContent && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          color: '#ffffff',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {textContent}
        </div>
      )}

      {/* Post Metadata */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        gap: '1rem',
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.6)'
      }}>
        <span>Media: {mediaCid.slice(0, 8)}...{mediaCid.slice(-6)}</span>
        <span>Text: {textCid.slice(0, 8)}...{textCid.slice(-6)}</span>
      </div>
    </div>
  )
}

export default PostViewer