import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, Bot, User, Loader, Mic, MicOff, Volume2 } from 'lucide-react';

// Main Component for the AI Assistant
const AIAssistant = () => {
  // State management for messages, input, loading status, and voice features
  const [messages, setMessages] = useState([]);
  const { user, userLocation } = useAuth();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Refs for DOM elements and browser APIs
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect to scroll down when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to set personalized greeting based on login details
  useEffect(() => {
    if (messages.length === 0) {
      const name = user?.name || (user?.email ? user.email.split('@')[0] : 'there');
      let locationText = '';
      if (userLocation?.place) locationText = ` in ${userLocation.place}`;
      else if (userLocation?.lat && userLocation?.lng) locationText = ' near your saved location';
      const greeting = `Hi ${name}${locationText}. I'm your emergency AI assistant. What issue are you facing right now? (e.g., medical, flood/heavy rain, fire, earthquake, cyclone, other)`;
      setMessages([
        {
          id: Date.now(),
          type: 'bot',
          content: greeting,
          timestamp: new Date()
        }
      ]);
    }
  }, [user, userLocation]);

  // Effect for one-time setup of browser APIs (Speech Recognition & Synthesis)
  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Cleanup function to stop services when the component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Function to handle sending a message to the Gemini API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // System prompt defining the AI's role and persona
      const systemPrompt = `You are an Indian emergency response AI assistant for a disaster response platform. Your role is to:
1. Provide immediate, actionable safety instructions.
2. Give clear, step-by-step guidance in short bullet points.
3. Tailor advice for India (infrastructure, climate, resources) and be practical.
4. When relevant, include emergency numbers for India: 112 (national), 100 (police), 108 (ambulance), 101 (fire).
5. Be calm, reassuring, and concise. Avoid speculation.
6. If the user is in immediate danger, tell them to call 112 and move to safety.

Response format:
- Start with a one-line summary of the key action.
- Then give 3–7 concise bullets of immediate steps (Do), and 2–4 bullets of Don’t if applicable.
- If helpful, include a short checklist or link idea (generic, no fake links).`;

      // API details
      const apiKey = ""; // The API key is managed by the execution environment.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      // Construct the payload for the API call
      const payload = {
        contents: [{ parts: [{ text: messageToSend }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
      };

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];
      
      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        speakText(text); // Speak the response
      } else {
        throw new Error("No content received from API.");
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback: provide quick, on-device guidance based on common topics
      const lower = messageToSend.toLowerCase();
      let fallback = '';
      if (lower.includes('earthquake')) {
        fallback = `Summary: Drop, Cover, Hold On; move to open area when safe.
Do:
- Drop under sturdy furniture, cover head/neck, hold on until shaking stops
- Stay away from windows/heavy objects; turn off gas/electricity if safe
- After shaking, evacuate to open ground and check injuries
Don't:
- Don’t use elevators; don’t run during shaking
Emergency: Call 112 if trapped or injured.`;
      } else if (lower.includes('flood') || lower.includes('heavy rain')) {
        fallback = `Summary: Move to higher ground and avoid floodwater.
Do:
- Go to upper floors/roof or higher ground immediately
- Switch off mains power; unplug appliances
- Avoid driving/walking through water; 15–30 cm can sweep you away
Don't:
- Don’t touch wet electrical equipment
Emergency: Call 112; for ambulance 108.`;
      } else if (lower.includes('fire')) {
        fallback = `Summary: Evacuate, stay low, and call 101.
Do:
- Crawl under smoke; close doors behind you
- Use stairs, not lifts; assemble at meeting point
Don't:
- Don’t re-enter for belongings
Emergency: Fire 101, National 112.`;
      } else if (lower.includes('cyclone') || lower.includes('storm')) {
        fallback = `Summary: Shelter indoors away from windows; secure items.
Do:
- Stay in interior room; keep emergency kit ready (water, torch, radio)
- Charge phone; follow IMD/NDMA advisories
Don't:
- Don’t go outside during the eye of the storm
Emergency: 112 if life-threatening.`;
      } else {
        fallback = `Summary: Ensure immediate safety; contact 112 if urgent.
Do:
- Move to a safe location
- Share your location with family/authorities
- Follow local advisories (police/NDMA)
Don't:
- Don’t delay calling 112 if in danger.`;
      }
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: fallback,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick questions for user guidance
  const quickQuestions = [
    'What should I do during an earthquake?',
    'How do I prepare an emergency kit?',
    'What are the evacuation procedures?',
    'How can I report a missing person?',
    'What should I do in a flood?',
    'How do I find emergency shelters?'
  ];

  // Handler for quick question buttons
  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  // Voice input functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text-to-speech function
  const speakText = (text) => {
    if (synthRef.current && text) {
      synthRef.current.cancel(); // Stop any currently playing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full max-w-4xl mx-auto flex flex-col font-sans p-4 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
          AI Emergency Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center sm:text-left">
          Get instant help and guidance for emergency situations.
        </p>
        <div className="flex items-center justify-center sm:justify-start space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isListening ? 'Listening...' : 'Voice Ready'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isSpeaking ? 'Speaking...' : 'Audio Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-sm lg:max-w-md px-4 py-2.5 rounded-xl shadow-sm ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1.5 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-9 h-9 bg-gray-600 dark:bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Section */}
        {messages.length < 3 && !isLoading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Or, ask a quick question:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-2.5 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 text-sm font-medium ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 focus:ring-gray-500'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isListening ? 'Stop' : 'Voice Input'}</span>
              </button>
              
              <button
                onClick={() => speakText(messages[messages.length - 1]?.content || '')}
                disabled={isLoading || !messages.length || isSpeaking || messages[messages.length-1].type === 'user'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 text-sm font-medium shadow-sm"
              >
                <Volume2 className="h-4 w-4" />
                <span>Repeat Last</span>
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="flex space-x-2 items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask for emergency procedures or use voice input..."
                className="flex-1 w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
