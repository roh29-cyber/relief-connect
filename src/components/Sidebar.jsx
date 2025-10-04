import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Search, 
  Shield, 
  Heart, 
  MessageCircle, 
  MessageSquare, 
  Info, 
  Radio,
  BookOpen,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Lost & Found', href: '/lost-found', icon: Search },
    { name: 'Instructions & Safety', href: '/instructions', icon: Shield },
    { name: 'Donation & Volunteers', href: '/donations', icon: Heart },
    { name: 'AI Assistant', href: '/ai-assistant', icon: MessageCircle },
    { name: 'Feedback', href: '/feedback', icon: MessageSquare },
    { name: 'About / Contact', href: '/about', icon: Info },
    { name: 'Live Updates', href: '/live-updates', icon: Radio },
    { name: 'Research Center', href: '/research', icon: BookOpen },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 lg:mt-16">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
