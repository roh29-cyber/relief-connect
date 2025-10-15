import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, MapPin } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const { login, saveUserLocation } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1: creds, 2: otp, 3: location
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [manualLocation, setManualLocation] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      setStep(2)
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleOtp = (e) => {
    e.preventDefault()
    setError('')
    if (otp.trim() === '1234') {
      setStep(3)
    } else {
      setError('Invalid OTP. Use 1234 for now.')
    }
  }

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        saveUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, source: 'gps' })
        navigate('/live-updates')
      },
      (err) => {
        setError(err.message || 'Unable to get location')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleManualLocation = (e) => {
    e.preventDefault()
    if (!manualLocation.trim()) {
      setError('Enter a location')
      return
    }
    saveUserLocation({ place: manualLocation.trim(), source: 'manual' })
    navigate('/live-updates')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Login</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} className="input-field pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">Continue</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtp} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Enter OTP</label>
            <input type="text" className="input-field" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Use 1234" />
          </div>
          <button type="submit" className="btn-primary w-full">Verify</button>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                <div>
                  <div className="font-medium">Use GPS location</div>
                  <div className="text-sm text-neutral-500">For nearby live alerts</div>
                </div>
              </div>
              <button onClick={handleUseGPS} disabled={loading} className="btn-primary disabled:opacity-50">Allow</button>
            </div>
          </div>
          <form onSubmit={handleManualLocation} className="card space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Or enter your area</label>
              <input type="text" className="input-field" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} placeholder="City / Area" />
            </div>
            <button type="submit" className="btn-outline w-full">Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login


