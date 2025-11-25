import { useState, useRef, useEffect } from 'react'
import './index.css'

function App() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Salam! I can translate anything to Darija. What do you want to translate?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = { sender: 'user', text: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://moroccan-dialect-translator-backend.onrender.com'
            const response = await fetch(`${apiUrl}/api/translator/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userMessage.text }),
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`)
            }

            const data = await response.json()

            const botMessage = {
                sender: 'bot',
                text: data.translation || '(No translation received)'
            }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error(error)
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, I encountered an error connecting to the server.'
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-container">
            <div className="sidebar">
                {/* Placeholder for history or settings */}
                <div style={{ padding: '1rem', color: '#a1a1aa', fontSize: '0.9rem' }}>
                    History
                </div>
            </div>

            <div className="main-content">
                <header className="chat-header">
                    <h1>Darija Translator 1.0</h1>
                </header>

                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div key={index} className="message-wrapper">
                            <div className={`message ${msg.sender}`}>
                                <div className={`avatar ${msg.sender}`}>
                                    {msg.sender === 'bot' ? '✨' : '👤'}
                                </div>
                                <div className="message-content">
                                    <div className="user-name">{msg.sender === 'bot' ? 'Moroccan Translator' : 'You'}</div>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message-wrapper">
                            <div className="message bot">
                                <div className="avatar bot">✨</div>
                                <div className="message-content">
                                    <div className="user-name">Gemini</div>
                                    <div className="typing">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-container">
                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message Gemini..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !input.trim()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
