import React, { createContext, useContext, useState } from 'react';

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

// This is our initial fake database data.
const initialSampleAlerts = [
    {
        id: 1,
        title: 'Severe Thunderstorm Warning',
        description: 'Severe thunderstorms with damaging winds and large hail expected across the region. Seek shelter immediately.',
        severity: 'high',
        location: 'Central Valley Region',
        alert_type: 'weather',
        source: 'National Weather Service',
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        active: true,
    },
    {
        id: 2,
        title: 'Evacuation Advisory',
        description: 'Voluntary evacuation recommended for residents in fire-prone areas due to extreme fire weather conditions.',
        severity: 'critical',
        location: 'Mountain Communities',
        alert_type: 'wildfire',
        source: 'Fire Department',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        active: true,
    },
     {
        id: 3,
        title: 'Flash Flood Watch',
        description: 'Heavy rainfall may cause flash flooding in low-lying areas. Avoid driving through flooded roads.',
        severity: 'medium',
        location: 'Riverside County',
        alert_type: 'flood',
        source: 'Emergency Management',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        active: true,
    },
    {
        id: 4,
        title: 'Power Outage Update',
        description: 'Widespread power outages affecting approximately 15,000 customers. Restoration efforts underway.',
        severity: 'low',
        location: 'Downtown District',
        alert_type: 'infrastructure',
        source: 'Utility Company',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        active: true,
    }
];

// This component will provide the database functions to the rest of the app.
export const DatabaseProvider = ({ children }) => {
  // Use state to make our mock database mutable (for INSERTs)
  const [alerts, setAlerts] = useState(initialSampleAlerts);

  // This function pretends to run a SQL query with more realistic logic.
  const executeQuery = async (query, params = []) => {
    console.log("Executing mock query:", query.trim().split('\n')[0], "...");

    const upperQuery = query.trim().toUpperCase();

    // Handle COUNT queries
    if (upperQuery.startsWith('SELECT COUNT(*)')) {
        return Promise.resolve({ success: true, data: [{ count: alerts.length }] });
    }

    // Handle INSERT queries
    if (upperQuery.startsWith('INSERT INTO')) {
        const newAlert = {
            id: Date.now(),
            title: params[0],
            description: params[1],
            severity: params[2],
            location: params[3],
            alert_type: params[4],
            source: params[5],
            created_at: new Date().toISOString(),
            active: true,
        };
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
        return Promise.resolve({ success: true, data: [] });
    }

    // Handle SELECT queries
    if (upperQuery.startsWith('SELECT')) {
      let data = [...alerts];

      // If the query includes the specific ORDER BY clause, sort the data
      if (upperQuery.includes('ORDER BY')) {
        const severityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
        data.sort((a, b) => {
          const severityA = severityOrder[a.severity] || 5;
          const severityB = severityOrder[b.severity] || 5;
          if (severityA !== severityB) {
            return severityA - severityB; // Sort by severity first
          }
          // If severity is the same, sort by date descending
          return new Date(b.created_at) - new Date(a.created_at);
        });
      }
      
      return Promise.resolve({ success: true, data });
    }
    
    // Default fallback for any other query type
    return Promise.resolve({ success: false, error: 'Unsupported query type' });
  };

  return (
    <DatabaseContext.Provider value={{ executeQuery }}>
      {children}
    </DatabaseContext.Provider>
  );
};

