import React, { useState, useRef } from 'react'
import { Search, Filter, Plus, Upload, User, MapPin, Calendar, Eye } from 'lucide-react'

const LostAndFound = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [extractedInfo, setExtractedInfo] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef(null)

  const [filters, setFilters] = useState({
    status: 'all',
    ageRange: 'all',
    location: ''
  })

  // Mock data for missing persons
  const missingPersons = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      lastSeen: '2024-01-15',
      location: 'Downtown Mall',
      description: 'Brown hair, blue eyes, wearing red jacket',
      image: '/api/placeholder/150/150',
      status: 'missing',
      reportedBy: 'Family Member'
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      lastSeen: '2024-01-14',
      location: 'Central Park',
      description: 'Black hair, brown eyes, wearing blue shirt',
      image: '/api/placeholder/150/150',
      status: 'found',
      reportedBy: 'Friend'
    }
  ]

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setSelectedImage(file)
    setIsAnalyzing(true)

    try {
      // First analyze the image
      const formData = new FormData()
      formData.append('image', file)
      formData.append('prompt', 'Describe this person in detail including physical characteristics, clothing, and any distinguishing features that would help identify them.')

      const imageResponse = await fetch('https://builder.empromptu.ai/api_tools/analyze_image', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
          'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
          'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
        },
        body: formData
      })

      const imageData = await imageResponse.json()
      
      if (imageData.value) {
        // Extract structured information from the image description
        const extractResponse = await fetch('https://builder.empromptu.ai/api_tools/apply_prompt_to_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 5254d3137bc61704d35e86e9e22c6bc6',
            'X-Generated-App-ID': '7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb',
            'X-Usage-Key': 'cbdf28b6a6e122cf39846203916f8199'
          },
          body: JSON.stringify({
            prompt_name: 'extract_person_info',
            input_data: {
              image_description: imageData.value
            },
            return_type: 'structured'
          })
        })

        const extractData = await extractResponse.json()
        setExtractedInfo(extractData.value)
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const filteredPersons = missingPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === 'all' || person.status === filters.status
    const matchesLocation = !filters.location || 
                           person.location.toLowerCase().includes(filters.location.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesLocation
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Lost & Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Help reunite families and find missing persons
          </p>
        </div>
        
        <button
          onClick={() => setShowReportForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Report Missing Person
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="missing">Missing</option>
            <option value="found">Found</option>
          </select>
          
          <select
            value={filters.ageRange}
            onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
            className="input-field"
          >
            <option value="all">All Ages</option>
            <option value="child">Child (0-17)</option>
            <option value="adult">Adult (18-64)</option>
            <option value="senior">Senior (65+)</option>
          </select>
          
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="input-field"
          />
        </div>
      </div>

      {/* Missing Persons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersons.map((person) => (
          <div key={person.id} className="card">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    person.status === 'missing' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {person.status}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {person.gender}, {person.age} years old
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {person.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {person.lastSeen}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {person.description}
                </p>
                
                <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Missing Person Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Report Missing Person
              </h2>
              
              <form className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Photo (Optional)
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Click to upload photo or drag and drop
                    </p>
                    {selectedImage && (
                      <p className="text-sm text-primary-600 mt-2">
                        {selectedImage.name}
                      </p>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* AI Analysis Results */}
                {isAnalyzing && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      <span className="text-blue-800 dark:text-blue-200">
                        Analyzing image and extracting information...
                      </span>
                    </div>
                  </div>
                )}

                {extractedInfo && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      Extracted Information:
                    </h3>
                    <pre className="text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap">
                      {JSON.stringify(extractedInfo, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input type="text" required className="input-field" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Age *
                    </label>
                    <input type="number" required className="input-field" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Gender
                    </label>
                    <select className="input-field">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Seen Date *
                    </label>
                    <input type="date" required className="input-field" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Seen Location *
                  </label>
                  <input type="text" required className="input-field" placeholder="Be as specific as possible" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Physical Description
                  </label>
                  <textarea 
                    rows={4} 
                    className="input-field" 
                    placeholder="Height, weight, hair color, eye color, clothing, distinguishing features..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Contact Information *
                  </label>
                  <input type="email" required className="input-field" placeholder="Your email address" />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LostAndFound
