import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock login - in real app, this would call your auth API
    const mockUser = {
      id: 1,
      email,
      name: email.split('@')[0],
      role: 'volunteer'
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (userData) => {
    // Mock registration
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'volunteer'
    }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return newUser
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
