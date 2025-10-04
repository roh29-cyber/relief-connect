import React, { createContext, useContext } from 'react'

const DatabaseContext = createContext()

export const useDatabase = () => {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider')
  }
  return context
}

export const DatabaseProvider = ({ children }) => {
  const executeQuery = async (query, params = []) => {
    try {
      const response = await fetch('https://builder.empromptu.ai/api_tools/templates/call_postgres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
          'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
          'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
        },
        body: JSON.stringify({ query, params })
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Database query error:', error)
      return { success: false, error: error.message }
    }
  }

  const createEmbedding = async (text) => {
    try {
      const response = await fetch('https://builder.empromptu.ai/api_tools/text_embedder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
          'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
          'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
        },
        body: JSON.stringify({ text })
      })

      const result = await response.json()
      return result.value
    } catch (error) {
      console.error('Embedding creation error:', error)
      return null
    }
  }

  return (
    <DatabaseContext.Provider value={{ executeQuery, createEmbedding }}>
      {children}
    </DatabaseContext.Provider>
  )
}
