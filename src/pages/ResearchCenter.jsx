import React, { useState } from 'react'
import { BookOpen, Search, Brain, FileText, Download, ExternalLink } from 'lucide-react'

const ResearchCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('search')

  const researchCategories = [
    {
      title: 'Disaster Preparedness',
      description: 'Research on emergency planning and community readiness',
      topics: ['Emergency Kits', 'Evacuation Planning', 'Community Resilience', 'Risk Assessment']
    },
    {
      title: 'Response Strategies',
      description: 'Effective disaster response methodologies and best practices',
      topics: ['First Aid', 'Search & Rescue', 'Emergency Communication', 'Resource Allocation']
    },
    {
      title: 'Recovery & Rebuilding',
      description: 'Long-term recovery strategies and community rebuilding',
      topics: ['Infrastructure Repair', 'Economic Recovery', 'Mental Health Support', 'Community Healing']
    },
    {
      title: 'Technology Solutions',
      description: 'Innovative technologies for disaster management',
      topics: ['AI Applications', 'Early Warning Systems', 'Mobile Apps', 'Data Analytics']
    }
  ]

  const featuredResearch = [
    {
      title: 'AI-Powered Early Warning Systems for Natural Disasters',
      authors: 'Dr. Sarah Chen, Prof. Michael Rodriguez',
      journal: 'Journal of Emergency Management',
      year: '2024',
      abstract: 'This study explores the implementation of machine learning algorithms for predicting natural disasters...',
      downloadUrl: '#'
    },
    {
      title: 'Community Resilience Building in Post-Disaster Recovery',
      authors: 'Dr. Emily Johnson, Dr. David Park',
      journal: 'Disaster Recovery Quarterly',
      year: '2024',
      abstract: 'An analysis of successful community-led recovery initiatives following major disasters...',
      downloadUrl: '#'
    },
    {
      title: 'Mobile Technology Adoption in Emergency Response',
      authors: 'Prof. Lisa Wang, Dr. James Miller',
      journal: 'Emergency Technology Review',
      year: '2023',
      abstract: 'Examining the role of mobile applications in coordinating emergency response efforts...',
      downloadUrl: '#'
    }
  ]

  const openYouTubeForTopic = (topic) => {
    const query = `${topic} India precautions`
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleResearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setLoading(true)
    try {
      const q = `${searchQuery} site:ndma.gov.in OR site:imd.gov.in OR site:who.int OR site:unicef.org`
      // Use DuckDuckGo's lucky redirect to open the top result directly
      const luckyUrl = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(q)}`
      window.open(luckyUrl, '_blank', 'noopener,noreferrer')
      setSearchResults(`Opened top result for: ${searchQuery}`)
    } finally {
      setLoading(false)
    }
  }

  const quickSearchTopics = [
    'Earthquake safety guidelines India',
    'Flood response best practices NDMA',
    'Cyclone preparedness IMD advisory',
    'Heatwave health advisory India',
    'Landslide risk mitigation NDMA',
    'Post-disaster mental health support India'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center">
          <BookOpen className="h-8 w-8 mr-3 text-primary-600" />
          Research Center
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          AI-powered research hub for disaster response and humanitarian aid
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'search'
              ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Brain className="h-4 w-4 inline mr-2" />
          AI Research
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'library'
              ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Research Library
        </button>
      </div>

      {activeTab === 'search' && (
        <div className="space-y-6">
          {/* AI Research Search */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              AI-Powered Research Assistant
            </h2>
            
            <form onSubmit={handleResearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your research question or topic..."
                  className="input-field pl-10"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="btn-primary disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Brain className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Researching...' : 'Start Research'}
              </button>
            </form>

            {/* Quick Search Topics */}
            <div className="mt-6">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Quick research topics:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSearchTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(topic)}
                    className="text-xs bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Research Results */}
          {searchResults && (
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Research Results
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <div className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                  {searchResults}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'library' && (
        <div className="space-y-6">
          {/* Research Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchCategories.map((category, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.topics.map((topic, topicIndex) => (
                    <button
                      key={topicIndex}
                      onClick={() => openYouTubeForTopic(topic)}
                      className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                      title={`Watch YouTube videos about ${topic}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Research */}
          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
              Featured Research Papers
            </h2>
            
            <div className="space-y-6">
              {featuredResearch.map((paper, index) => (
                <div key={index} className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    {paper.title}
                  </h3>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    <span className="font-medium">{paper.authors}</span> • {paper.journal} • {paper.year}
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
                    {paper.abstract}
                  </p>
                  <div className="flex space-x-3">
                    <button className="btn-outline text-sm flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      Download PDF
                    </button>
                    <button className="btn-outline text-sm flex items-center">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Online
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Guidelines */}
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Research Guidelines
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <p>• All research is peer-reviewed and from credible sources</p>
              <p>• Information is regularly updated to reflect current best practices</p>
              <p>• Research findings should be adapted to local conditions and regulations</p>
              <p>• For emergency situations, always follow official guidance from local authorities</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchCenter
