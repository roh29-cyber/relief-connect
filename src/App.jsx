import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import EmergencyButton from './components/EmergencyButton'
import Home from './pages/Home'
import LostAndFound from './pages/LostAndFound'
import Instructions from './pages/Instructions'
import Donations from './pages/Donations'
import AIAssistant from './pages/AIAssistant'
import Feedback from './pages/Feedback'
import About from './pages/About'
import LiveUpdates from './pages/LiveUpdates'
import ResearchCenter from './pages/ResearchCenter'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            <div className="flex">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
              <main className="flex-1 lg:ml-64 transition-all duration-300">
                <div className="p-4 lg:p-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lost-found" element={<LostAndFound />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/live-updates" element={<LiveUpdates />} />
                    <Route path="/research" element={<ResearchCenter />} />
                  </Routes>
                </div>
              </main>
            </div>
            
            <EmergencyButton />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
