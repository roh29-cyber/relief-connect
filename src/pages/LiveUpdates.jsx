import React, { useState, useEffect } from 'react'
import { AlertTriangle, Radio, MapPin, Clock, Filter, RefreshCw } from 'lucide-react'
import { useDatabase } from '../contexts/DatabaseContext'

const LiveUpdates = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { executeQuery } = useDatabase()

  const severityColors = {
    critical: 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
    high: 'bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200',
    medium: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
    low: 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
  }

  const severityIcons = {
    critical: '🚨',
    high: '⚠️',
    medium: '⚡',
    low: 'ℹ️'
  }

  useEffect(() => {
    loadAlerts()
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadAlerts = async () => {
    try {
      // First, create some sample alerts if none exist
      await createSampleAlerts()
      
      const result = await executeQuery(`
        SELECT * FROM newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts 
        WHERE active = true 
        ORDER BY 
          CASE severity 
            WHEN 'critical' THEN 1 
            WHEN 'high' THEN 2 
            WHEN 'medium' THEN 3 
            WHEN 'low' THEN 4 
          END,
          created_at DESC
      `)
      
      if (result.success) {
        setAlerts(result.data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error loading alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createSampleAlerts = async () => {
    try {
      // Check if alerts already exist
      const existingAlerts = await executeQuery(`
        SELECT COUNT(*) as count FROM newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts
      `)
      
      if (existingAlerts.success && existingAlerts.data[0].count > 0) {
        return // Alerts already exist
      }

      const sampleAlerts = [
        {
          title: 'Severe Thunderstorm Warning',
          description: 'Severe thunderstorms with damaging winds and large hail expected across the region. Seek shelter immediately.',
          severity: 'high',
          location: 'Central Valley Region',
          alert_type: 'weather',
          source: 'National Weather Service'
        },
        {
          title: 'Flash Flood Watch',
          description: 'Heavy rainfall may cause flash flooding in low-lying areas. Avoid driving through flooded roads.',
          severity: 'medium',
          location: 'Riverside County',
          alert_type: 'flood',
          source: 'Emergency Management'
        },
        {
          title: 'Evacuation Advisory',
          description: 'Voluntary evacuation recommended for residents in fire-prone areas due to extreme fire weather conditions.',
          severity: 'critical',
          location: 'Mountain Communities',
          alert_type: 'wildfire',
          source: 'Fire Department'
        },
        {
          title: 'Power Outage Update',
          description: 'Widespread power outages affecting approximately 15,000 customers. Restoration efforts underway.',
          severity: 'low',
          location: 'Downtown District',
          alert_type: 'infrastructure',
          source: 'Utility Company'
        }
      ]

      for (const alert of sampleAlerts) {
        await executeQuery(`
          INSERT INTO newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts 
          (title, description, severity, location, alert_type, source)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [alert.title, alert.description, alert.severity, alert.location, alert.alert_type, alert.source])
      }
    } catch (error) {
      console.error('Error creating sample alerts:', error)
    }
  }

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter)

  const handleRefresh = () => {
    setLoading(true)
    loadAlerts()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center">
            <Radio className="h-8 w-8 mr-3 text-red-500" />
            Live Updates
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time disaster alerts and emergency information
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="btn-outline flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-neutral-500" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Filter by severity:</span>
          
          {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                filter === severity
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Alerts Count */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['critical', 'high', 'medium', 'low'].map((severity) => {
          const count = alerts.filter(alert => alert.severity === severity).length
          return (
            <div key={severity} className="card text-center">
              <div className="text-2xl mb-1">{severityIcons[severity]}</div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">{count}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                {severity} Alerts
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {loading && alerts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3"></div>
            <span className="text-neutral-600 dark:text-neutral-400">Loading alerts...</span>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="card text-center py-12">
            <AlertTriangle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
              No alerts found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {filter === 'all' 
                ? 'There are currently no active alerts in your area.'
                : `No ${filter} severity alerts at this time.`
              }
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`card border-l-4 ${severityColors[alert.severity]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{severityIcons[alert.severity]}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {alert.title}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                        alert.severity === 'critical' ? 'bg-red-600 text-white' :
                        alert.severity === 'high' ? 'bg-orange-600 text-white' :
                        alert.severity === 'medium' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="capitalize">{alert.alert_type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                {alert.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date(alert.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Radio className="h-4 w-4 mr-1" />
                  <span>Source: {alert.source}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Emergency Information */}
      <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Emergency Information
            </h3>
            <div className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <p>• For life-threatening emergencies, call 911 immediately</p>
              <p>• Follow official evacuation orders without delay</p>
              <p>• Stay tuned to local emergency broadcasts</p>
              <p>• Keep emergency supplies ready and accessible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveUpdates
