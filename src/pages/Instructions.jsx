import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Shield, 
  Zap, 
  Waves, 
  Wind, 
  Flame, 
  Mountain, 
  Snowflake,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

const Instructions = () => {
  const { t } = useLanguage()
  const [selectedDisaster, setSelectedDisaster] = useState('earthquake')
  const [selectedPhase, setSelectedPhase] = useState('before')
  const [safetyGuide, setSafetyGuide] = useState('')
  const [loading, setLoading] = useState(false)

  const disasters = [
    { id: 'earthquake', name: 'Earthquake', icon: Mountain, color: 'bg-orange-500' },
    { id: 'flood', name: 'Flood', icon: Waves, color: 'bg-blue-500' },
    { id: 'hurricane', name: 'Hurricane', icon: Wind, color: 'bg-purple-500' },
    { id: 'wildfire', name: 'Wildfire', icon: Flame, color: 'bg-red-500' },
    { id: 'tornado', name: 'Tornado', icon: Wind, color: 'bg-gray-500' },
    { id: 'blizzard', name: 'Blizzard', icon: Snowflake, color: 'bg-cyan-500' },
    { id: 'thunderstorm', name: 'Thunderstorm', icon: Zap, color: 'bg-yellow-500' },
    { id: 'heatwave', name: 'Heat Wave', icon: Flame, color: 'bg-orange-600' }
  ]

  const phases = [
    { id: 'before', name: 'Before', icon: Clock, description: 'Preparation and planning' },
    { id: 'during', name: 'During', icon: AlertTriangle, description: 'Immediate response' },
    { id: 'after', name: 'After', icon: CheckCircle, description: 'Recovery and cleanup' }
  ]

  const fetchSafetyGuide = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://builder.empromptu.ai/api_tools/apply_prompt_to_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
          'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
          'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
        },
        body: JSON.stringify({
          prompt_name: 'disaster_safety_guide',
          input_data: {
            disaster_type: selectedDisaster,
            phase: selectedPhase
          },
          return_type: 'pretty_text'
        })
      })

      const data = await response.json()
      setSafetyGuide(data.value || 'Safety guide not available.')
    } catch (error) {
      console.error('Error fetching safety guide:', error)
      setSafetyGuide('Error loading safety guide. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchSafetyGuide()
  }, [selectedDisaster, selectedPhase])

  const quickTips = {
    earthquake: [
      'Drop, Cover, and Hold On',
      'Stay away from windows and heavy objects',
      'If outdoors, move away from buildings',
      'Do not run outside during shaking'
    ],
    flood: [
      'Move to higher ground immediately',
      'Never drive through flooded roads',
      'Avoid walking in moving water',
      'Listen for evacuation orders'
    ],
    hurricane: [
      'Board up windows and secure outdoor items',
      'Stock up on water and non-perishable food',
      'Charge all electronic devices',
      'Know your evacuation route'
    ],
    wildfire: [
      'Create defensible space around your home',
      'Have an evacuation plan ready',
      'Keep important documents accessible',
      'Monitor air quality and stay indoors if needed'
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Instructions & Safety
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Get comprehensive safety guidelines for various disaster scenarios
        </p>
      </div>

      {/* Disaster Type Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Disaster Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {disasters.map((disaster) => (
            <button
              key={disaster.id}
              onClick={() => setSelectedDisaster(disaster.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedDisaster === disaster.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className={`${disaster.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <disaster.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {disaster.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Phase Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Phase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedPhase === phase.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center mb-2">
                <phase.icon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {phase.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {phase.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Contacts - Moved up for better visibility */}
      <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
          {t.emergencyContacts}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-red-700 dark:text-red-300">{t.national}:</span>
            <span className="font-medium text-red-800 dark:text-red-200">112</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-700 dark:text-red-300">{t.police}:</span>
            <span className="font-medium text-red-800 dark:text-red-200">100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-700 dark:text-red-300">{t.ambulance}:</span>
            <span className="font-medium text-red-800 dark:text-red-200">108</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-700 dark:text-red-300">{t.fire}:</span>
            <span className="font-medium text-red-800 dark:text-red-200">101</span>
          </div>
        </div>
      </div>

      {/* Emergency Kit Essentials - Moved up for better visibility */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
          {t.kitTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {t.kitItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Safety Guide */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Safety Guidelines: {disasters.find(d => d.id === selectedDisaster)?.name} - {phases.find(p => p.id === selectedPhase)?.name}
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  Loading safety guidelines...
                </span>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {safetyGuide}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Tips
            </h3>
            <div className="space-y-3">
              {(quickTips[selectedDisaster] || []).map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Instructions
