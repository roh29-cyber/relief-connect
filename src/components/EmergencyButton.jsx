import React, { useState } from 'react'
import { Phone, X } from 'lucide-react'

const EmergencyButton = () => {
  const [showModal, setShowModal] = useState(false)

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical' },
    { name: 'Disaster Hotline', number: '1-800-DISASTER', description: '24/7 Disaster Support' },
    { name: 'Red Cross', number: '1-800-RED-CROSS', description: 'Emergency Assistance' },
    { name: 'FEMA', number: '1-800-621-3362', description: 'Federal Emergency Management' },
  ]

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg emergency-pulse z-50 focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Emergency SOS"
      >
        <Phone className="h-6 w-6" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                Emergency Contacts
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contact.description}
                      </p>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> In life-threatening emergencies, call 911 immediately.
                This app provides support resources but is not a substitute for emergency services.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmergencyButton
