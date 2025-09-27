import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'

interface UserContextType {
  nullifier: string | null
  gender: string | null
  isLoading: boolean
  error: string | null
  fetchUserData: (address: string) => Promise<void>
  clearUserData: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [nullifier, setNullifier] = useState<string | null>(null)
  const [gender, setGender] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async (address: string) => {
    if (!address) {
      setError('No address provided')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const res = await axios.post('http://localhost:3000/api/users/', {
        address: address
      })

      if (res.data.success) {
        console.log("User record created / fetched successfully")
        console.log(res.data.contractData)
        
        // Extract nullifier and gender from the response
        const contractData = res.data.contractData
        if (contractData) {
          setNullifier(contractData.nullifier || null)
          setGender(contractData.gender || null)
        }
      } else {
        setError('Failed to fetch user data')
      }
    } catch (err: any) {
      console.error("Server Error:", err)
      setError(err.response?.data?.message || err.message || 'Failed to fetch user data')
    } finally {
      setIsLoading(false)
    }
  }

  const clearUserData = () => {
    setNullifier(null)
    setGender(null)
    setError(null)
    setIsLoading(false)
  }

  const value: UserContextType = {
    nullifier,
    gender,
    isLoading,
    error,
    fetchUserData,
    clearUserData
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
