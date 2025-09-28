import { useState, useEffect } from 'react'
import { useWeb3 } from '../../contexts/Web3Context'
import { useUser } from '../../contexts/UserContext'
import PostViewer from '../../components/PostViewer'
import axios from 'axios'

interface Post {
  _id: string
  mediaCid: string
  textCid: string
  isPublic: boolean
  creator: string
  targetGender: string
}

function DashboardHome() {
  // const { account, balance, chainId } = useWeb3()
  const { nullifier, gender, isLoading: isUserLoading } = useUser()
  
  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const [error, setError] = useState<string>('')
  const [hasMorePosts, setHasMorePosts] = useState(true)

  // Fetch single post function
  const fetchPost = async (page: number, userGender: string) => {
    try {
      setIsLoadingPost(true)
      setError('')

      const response = await axios.get('http://localhost:3000/api/posts', {
        params: {
          page, gender: userGender, limit: 1
        }
      })

      const data = response.data
      console.log(data)
      if (response.status === 200) {
        const _post = {
          _id: data.data._id,
          mediaCid: data.data.mediaCid,
          textCid: data.data.textCid,
          isPublic: data.data.isPublic,
          creator: data.data.creator,
          targetGender: data.data.targetGender
        }
        setCurrentPost(_post)
      } else {
        setCurrentPost(null)
      }
    } catch (err) {
      console.error('Error fetching post:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch post')
      setCurrentPost(null)
    } finally {
      setIsLoadingPost(false)
    }
  }

  // Initial load when gender becomes available
  useEffect(() => {
    if (gender && !isUserLoading) {
      setCurrentPage(1)
      fetchPost(1, gender)
    }
  }, [gender, isUserLoading])

  // Handle next post
  const handleNextPost = () => {
    if (!isLoadingPost && hasMorePosts && gender) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      fetchPost(nextPage, gender)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Loading state for gender */}
      {isUserLoading && (
        <div style={{
          background: 'rgba(139, 69, 255, 0.1)',
          border: '1px solid rgba(139, 69, 255, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            Waiting for identity verification...
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !isUserLoading && (
        <div style={{
          background: 'rgba(255, 107, 53, 0.1)',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          color: '#ff6b35',
          marginBottom: '1rem'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Loading state for post */}
      {isLoadingPost && gender && (
        <div style={{
          background: 'rgba(139, 69, 255, 0.1)',
          border: '1px solid rgba(139, 69, 255, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
      )}

      {/* Post Display */}
      {!isUserLoading && gender && currentPost && !isLoadingPost && (
        <>
          <PostViewer
            mediaCid={currentPost.mediaCid}
            textCid={currentPost.textCid}
            isPublic={currentPost.isPublic}
          />
          
          {/* Next Post Button */}
          {hasMorePosts && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={handleNextPost}
                disabled={isLoadingPost}
                style={{
                  background: 'linear-gradient(45deg, #8b45ff, #00d4ff)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(139, 69, 255, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 255, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 255, 0.4)'
                }}
              >
                Next Post →
              </button>
            </div>
          )}
        </>
      )}

      {/* No posts state */}
      {!isUserLoading && gender && !currentPost && !isLoadingPost && !error && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          color: '#00d4ff'
        }}>
          📭 No posts available for your gender preference yet.
        </div>
      )}

      {/* End of posts state */}
      {!isUserLoading && gender && currentPost && !hasMorePosts && !isLoadingPost && (
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem'
        }}>
          🎉 You've reached the end of the feed!
        </div>
      )}
    </div>
  )
}

export default DashboardHome
