import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, Mic, MicOff, Volume2 } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

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
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [geminiApiKey, setGeminiApiKey] = useState('')
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)
  const genAI = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize Gemini AI
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || localStorage.getItem('geminiApiKey')
    if (apiKey) {
      setGeminiApiKey(apiKey)
      genAI.current = new GoogleGenerativeAI(apiKey)
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading || !genAI.current) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = inputMessage
    setInputMessage('')
    setIsLoading(true)

    try {
      const model = genAI.current.getGenerativeModel({ model: 'gemini-pro' })
      
      const prompt = `You are an emergency response AI assistant for a disaster response platform. Your role is to:
1. Provide immediate emergency guidance and safety instructions
2. Help users navigate emergency situations with calm, clear directions
3. Offer disaster preparedness advice and safety protocols
4. Connect users with appropriate emergency resources and contacts
5. Provide emotional support during crisis situations
6. Answer questions about missing persons, evacuation procedures, and emergency supplies

Always prioritize user safety, provide actionable advice, and maintain a calm, reassuring tone. If a situation requires immediate emergency services, direct users to call 911 immediately.

User question: ${messageToSend}`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: text,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      
      // Speak the response
      speakText(text)
      
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

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthRef.current.speak(utterance)
    }
  }

  const handleApiKeySubmit = (e) => {
    e.preventDefault()
    if (geminiApiKey.trim()) {
      localStorage.setItem('geminiApiKey', geminiApiKey)
      genAI.current = new GoogleGenerativeAI(geminiApiKey)
    }
  }

  // Show API key setup if not configured
  if (!geminiApiKey) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Setup Gemini API
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please enter your Google Gemini API key to use the AI assistant.
          </p>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Setup Assistant
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Get your API key from{' '}
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              Google AI Studio
            </a>
          </p>
        </div>
      </div>
    )
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
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isListening ? 'Listening...' : 'Voice ready'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isSpeaking ? 'Speaking...' : 'Audio ready'}
            </span>
          </div>
        </div>
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
          <div className="flex flex-col space-y-3">
            {/* Voice Controls Row */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-gray-500'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="text-sm font-medium">
                  {isListening ? 'Stop Listening' : 'Start Voice Input'}
                </span>
              </button>
              
              <button
                onClick={() => speakText(messages[messages.length - 1]?.content || '')}
                disabled={isLoading || !messages.length || isSpeaking}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-medium">Repeat Last</span>
              </button>
            </div>
            
            {/* Text Input Row */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about emergency response or use voice input above..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={isLoading || !genAI.current}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim() || !genAI.current}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
