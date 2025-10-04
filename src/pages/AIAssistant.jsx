import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader } from 'lucide-react'

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your emergency response AI assistant. I can help you with safety guidelines, emergency procedures, and connect you with appropriate resources. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agentId, setAgentId] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Create AI agent on component mount
    const createAgent = async () => {
      try {
        const response = await fetch('https://builder.empromptu.ai/api_tools/create-agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
            'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
            'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
          },
          body: JSON.stringify({
            instructions: `You are an emergency response AI assistant for a disaster response platform. Your role is to:
            1. Provide immediate emergency guidance and safety instructions
            2. Help users navigate emergency situations with calm, clear directions
            3. Offer disaster preparedness advice and safety protocols
            4. Connect users with appropriate emergency resources and contacts
            5. Provide emotional support during crisis situations
            6. Answer questions about missing persons, evacuation procedures, and emergency supplies
            
            Always prioritize user safety, provide actionable advice, and maintain a calm, reassuring tone. If a situation requires immediate emergency services, direct users to call 911 immediately.`,
            agent_name: 'Emergency Response Assistant'
          })
        })

        const data = await response.json()
        if (data.agent_id) {
          setAgentId(data.agent_id)
        }
      } catch (error) {
        console.error('Error creating agent:', error)
      }
    }

    createAgent()
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading || !agentId) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('https://builder.empromptu.ai/api_tools/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
          'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
          'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
        },
        body: JSON.stringify({
          agent_id: agentId,
          message: inputMessage
        })
      })

      const data = await response.json()
      
      if (data.response) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact emergency services directly if this is urgent.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    'What should I do during an earthquake?',
    'How do I prepare an emergency kit?',
    'What are the evacuation procedures?',
    'How can I report a missing person?',
    'What should I do in a flood?',
    'How do I find emergency shelters?'
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Emergency Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Get instant help and guidance for emergency situations
        </p>
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Quick questions to get started:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about emergency response..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={isLoading || !agentId}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim() || !agentId}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
