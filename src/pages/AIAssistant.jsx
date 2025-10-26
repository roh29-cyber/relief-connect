import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Send, Bot, User, Loader, Mic, MicOff, Volume2 } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const { user, userLocation } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  // Greeting on load
  useEffect(() => {
    if (messages.length === 0) {
      const name = user?.name || user?.email?.split("@")[0] || "there";
      let locationText = "";
      if (userLocation?.place) locationText = ` in ${userLocation.place}`;
      else if (userLocation?.lat && userLocation?.lng)
        locationText = " near your saved location";
      const greeting = `Hi ${name}${locationText}! I'm your emergency AI assistant. What issue are you facing right now? (e.g., medical, flood/heavy rain, fire, earthquake, cyclone, other)`;
      setMessages([
        { id: Date.now(), type: "bot", content: greeting, timestamp: new Date() },
      ]);
    }
  }, [user, userLocation]);

  // Setup SpeechRecognition & SpeechSynthesis
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    if ("speechSynthesis" in window) synthRef.current = window.speechSynthesis;

    return () => {
      recognitionRef.current?.stop();
      synthRef.current?.cancel();
    };
  }, []);

  const speakText = (text) => {
    if (synthRef.current && text) {
      synthRef.current.cancel();
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

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

      const systemPrompt = `You are an Indian emergency response AI assistant. You help people during emergencies like floods, earthquakes, fires, medical emergencies, etc. Provide clear, concise, actionable steps with relevant emergency contact numbers when needed. Always prioritize safety and immediate action.`;

      // Build conversation context
      const conversationHistory = messages
        .slice(-4) // Keep last 4 messages for context
        .map((m) => `${m.type === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      const fullPrompt = conversationHistory 
        ? `Previous conversation:\n${conversationHistory}\n\nCurrent question: ${messageToSend}`
        : messageToSend;

      // Send request to local server proxy which holds credentials
      const apiUrl = `/api/gemini/generate`;
      const payload = {
        prompt: `${systemPrompt}\n\n${fullPrompt}`,
        model,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Try to parse server error info
        const errBody = await response.json().catch(() => ({}));
        console.error("Proxy error body:", errBody);
        throw new Error(`AI proxy request failed: ${response.status} - ${errBody.error?.message || response.statusText}`);
      }

      const result = await response.json();

      // Handle different response structures (proxy returns Gemini output)
      let botText;
      if (result.candidates && result.candidates[0]) {
        const candidate = result.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
          botText = candidate.content.parts[0].text;
        } else if (candidate.output && typeof candidate.output === 'string') {
          botText = candidate.output;
        } else {
          botText = "I received an empty response. Please try rephrasing your question.";
        }
      } else if (result.outputText) {
        botText = result.outputText;
      } else {
        botText = "I couldn't process your request. Please try again.";
      }

      // Handle safety blocks
      if (result.candidates && result.candidates[0]?.finishReason === "SAFETY") {
        botText = "I can't provide assistance for this type of request. Please ask about emergency procedures or safety information.";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "bot", content: botText, timestamp: new Date() },
      ]);

      speakText(botText);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.message.includes("API key not configured")) {
        errorMessage = "AI Assistant is not configured. Please contact support.";
      } else if (err.message.includes("API request failed")) {
        errorMessage = "AI service is temporarily unavailable. Please try again later.";
      } else if (err.message.includes("fetch")) {
        errorMessage = "Network error. Please check your internet connection.";
      }
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "bot", content: errorMessage, timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };
  const stopListening = () => recognitionRef.current?.stop() && setIsListening(false);

  const quickQuestions = [
    "What should I do during an earthquake?",
    "How do I prepare an emergency kit?",
    "What are the evacuation procedures?",
    "How can I report a missing person?",
    "What should I do in a flood?",
    "How do I find emergency shelters?",
  ];

  return (
    <div className="h-[calc(100vh-4rem)] w-full max-w-4xl mx-auto flex flex-col p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center sm:text-left text-gray-900 dark:text-white">
        AI Emergency Assistant
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-center sm:text-left">
        Get instant help for emergency situations.
      </p>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mt-4">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "bot" && (
                <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-sm lg:max-w-md px-4 py-2.5 rounded-xl shadow-sm ${
                  msg.type === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1.5 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {msg.type === "user" && (
                <div className="w-9 h-9 bg-gray-600 dark:bg-gray-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl rounded-bl-none flex items-center space-x-2">
                <Loader className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length < 3 && !isLoading && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Or, ask a quick question:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInputMessage(q)}
                  className="text-left p-2.5 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isListening ? "Stop" : "Voice Input"}</span>
              </button>

              <button
                onClick={() => speakText(messages[messages.length - 1]?.content || "")}
                disabled={isLoading || !messages.length || isSpeaking || messages[messages.length - 1]?.type === "user"}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg"
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
                className="flex-1 w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg"
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
