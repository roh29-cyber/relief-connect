import React, { useState } from 'react'
import { 
  Heart, 
  IndianRupee, 
  Package, 
  Users, 
  MapPin, 
  Clock,
  CheckCircle,
  Star
} from 'lucide-react'

const Donations = () => {
  const [activeTab, setActiveTab] = useState('donate')
  const [donationType, setDonationType] = useState('money')
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [],
    availability: '',
    location: ''
  })

  const campaigns = [
    {
      id: 1,
      title: 'Cyclone Relief Fund',
      description: 'Supporting families affected by recent cyclone damage',
      raised: 7500000,
      goal: 10000000,
      donors: 1250,
      urgent: true
    },
    {
      id: 2,
      title: 'Emergency Shelter Supplies',
      description: 'Providing essential supplies for temporary shelters',
      raised: 4500000,
      goal: 6000000,
      donors: 890,
      urgent: false
    },
    {
      id: 3,
      title: 'Medical Equipment Fund',
      description: 'Purchasing medical supplies for disaster response',
      raised: 3200000,
      goal: 5000000,
      donors: 567,
      urgent: true
    }
  ]

  const volunteerOpportunities = [
    {
      id: 1,
      title: 'Emergency Response Team',
      description: 'First responders for disaster situations',
      location: 'Various locations',
      timeCommitment: 'On-call basis',
      skills: ['First Aid', 'CPR', 'Emergency Response'],
      urgent: true
    },
    {
      id: 2,
      title: 'Shelter Coordinator',
      description: 'Help manage emergency shelters and assist evacuees',
      location: 'Downtown Community Center',
      timeCommitment: '4-8 hours/week',
      skills: ['Organization', 'Communication', 'Leadership'],
      urgent: false
    },
    {
      id: 3,
      title: 'Supply Distribution',
      description: 'Sort and distribute emergency supplies to affected areas',
      location: 'Warehouse District',
      timeCommitment: 'Flexible shifts',
      skills: ['Physical work', 'Teamwork', 'Attention to detail'],
      urgent: false
    }
  ]

  const skillOptions = [
    'First Aid/CPR',
    'Medical Training',
    'Construction/Repair',
    'Transportation',
    'Translation',
    'IT/Communications',
    'Counseling/Mental Health',
    'Logistics/Organization',
    'Cooking/Food Service',
    'Childcare'
  ]

  const handleSkillToggle = (skill) => {
    setVolunteerForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleVolunteerSubmit = (e) => {
    e.preventDefault()
    // Handle volunteer registration
    console.log('Volunteer registration:', volunteerForm)
    alert('Thank you for volunteering! We will contact you soon.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Donation & Volunteers
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Support disaster relief efforts through donations and volunteering
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('donate')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'donate'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <IndianRupee className="inline h-4 w-4 mr-2" />
          Donate
        </button>
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'volunteer'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Users className="inline h-4 w-4 mr-2" />
          Volunteer
        </button>
      </div>

      {activeTab === 'donate' && (
        <div className="space-y-6">
          {/* Donation Type Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How would you like to help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setDonationType('money')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  donationType === 'money'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                }`}
              >
                <IndianRupee className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Monetary Donation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Flexible funding for immediate needs
                </p>
              </button>
              
              <button
                onClick={() => setDonationType('supplies')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  donationType === 'supplies'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                }`}
              >
                <Package className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Supply Donation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Physical items and supplies
                </p>
              </button>
              
              <button
                onClick={() => setDonationType('food')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  donationType === 'food'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                }`}
              >
                <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Food Donation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Meals and non-perishable food
                </p>
              </button>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Active Campaigns
            </h2>
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {campaign.title}
                        </h3>
                        {campaign.urgent && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {campaign.description}
                      </p>
                    </div>
                    <button className="btn-primary">
                      Donate Now
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        ₹{campaign.raised.toLocaleString('en-IN')} raised
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ₹{campaign.goal.toLocaleString('en-IN')} goal
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-1" />
                    {campaign.donors} donors
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Form */}
          {donationType === 'money' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Make a Donation
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {[500, 1000, 2500, 5000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Custom amount (₹)"
                    className="input-field"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input type="text" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input type="email" className="input-field" />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Make this a monthly recurring donation
                    </span>
                  </label>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Complete Donation
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'volunteer' && (
        <div className="space-y-6">
          {/* Volunteer Opportunities */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Volunteer Opportunities
            </h2>
            <div className="space-y-4">
              {volunteerOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {opportunity.title}
                        </h3>
                        {opportunity.urgent && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
                            Urgent Need
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {opportunity.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-1" />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-1" />
                          {opportunity.timeCommitment}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Star className="h-4 w-4 mr-1" />
                          {opportunity.skills.join(', ')}
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Registration Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Volunteer Registration
            </h2>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location/City
                  </label>
                  <input
                    type="text"
                    value={volunteerForm.location}
                    onChange={(e) => setVolunteerForm({...volunteerForm, location: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills & Expertise (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={volunteerForm.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Availability
                </label>
                <select
                  value={volunteerForm.availability}
                  onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible</option>
                  <option value="emergency-only">Emergency situations only</option>
                </select>
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Register as Volunteer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Donations
