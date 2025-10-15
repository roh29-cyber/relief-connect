import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Shield, 
  Heart, 
  MessageCircle, 
  AlertTriangle,
  Users,
  Globe,
  Clock
} from 'lucide-react'

import { useLanguage } from '../contexts/LanguageContext'

const Home = () => {
  const { t } = useLanguage()
  const quickActions = [
    {
      title: 'Report Missing Person',
      description: 'Help find missing individuals',
      icon: Search,
      href: '/lost-found',
      color: 'bg-blue-500'
    },
    {
      title: 'Safety Instructions',
      description: 'Get emergency guidelines',
      icon: Shield,
      href: '/instructions',
      color: 'bg-green-500'
    },
    {
      title: 'Volunteer & Donate',
      description: 'Support relief efforts',
      icon: Heart,
      href: '/donations',
      color: 'bg-red-500'
    },
    {
      title: 'AI Emergency Help',
      description: 'Get instant assistance',
      icon: MessageCircle,
      href: '/ai-assistant',
      color: 'bg-purple-500'
    }
  ]

  const stats = [
    { label: 'People Helped', value: '12,847', icon: Users },
    { label: 'Active Volunteers', value: '2,341', icon: Heart },
    { label: 'Countries Served', value: '45', icon: Globe },
    { label: 'Response Time', value: '<2min', icon: Clock }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {t.home.heroTitle}
          <span className="block text-primary-600 dark:text-primary-400">
            {t.home.heroSubtitle}
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Connect with emergency resources, report incidents, find missing persons, 
          and get AI-powered assistance during disasters and emergencies.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/ai-assistant" className="btn-primary text-lg px-8 py-3">
            {t.home.getHelp}
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            {t.home.reportIncident}
          </button>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3" />
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
              {t.home.advisoryTitle}
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              {t.home.advisoryBody}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="card hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Updates */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t.home.recentUpdates}
        </h2>
        <div className="space-y-4">
          {[ 
            {
              time: '2 hours ago',
              title: 'Relief camp opened in district headquarters',
              description: 'Facility can accommodate 200 people with essential amenities.'
            },
            {
              time: '4 hours ago',
              title: 'Missing person found safe',
              description: 'Individual reported missing yesterday has been located by local authorities.'
            },
            {
              time: '6 hours ago',
              title: 'Volunteer training session scheduled',
              description: 'Join this weekend for emergency response training in your city.'
            }
          ].map((update, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {update.time}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {update.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {update.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
