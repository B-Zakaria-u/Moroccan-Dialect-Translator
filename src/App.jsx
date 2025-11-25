import { useState, useRef, useEffect } from 'react'
import Background3D from './Background3D'
import './index.css'

function App() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Salam! I can translate text or images to Darija. Type or upload an image!' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

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

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB')
            return
        }

        setSelectedImage(file)
    }

    const handleImageUpload = async () => {
        if (!selectedImage) return

        const userMessage = {
            sender: 'user',
            text: '[Image uploaded]',
            image: URL.createObjectURL(selectedImage)
        }
        setMessages(prev => [...prev, userMessage])
        setSelectedImage(null)
        setLoading(true)

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://moroccan-dialect-translator-backend.onrender.com'
            const formData = new FormData()
            formData.append('image', selectedImage)

            const response = await fetch(`${apiUrl}/api/translator/translate-image`, {
                method: 'POST',
                body: formData,
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
                text: 'Sorry, I encountered an error processing the image.'
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <div className="app-container">
            <Background3D />
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
                                    {msg.image && (
                                        <img src={msg.image} alt="Uploaded" style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />
                                    )}
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
                                    <div className="user-name">Moroccan Translator</div>
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
                    {selectedImage && (
                        <div className="image-preview-container">
                            <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                            <span style={{ flex: 1, color: '#fff', fontSize: '0.9rem' }}>{selectedImage.name}</span>
                            <button onClick={() => setSelectedImage(null)} style={{ background: 'rgba(255, 68, 68, 0.2)', border: '1px solid rgba(255, 68, 68, 0.5)', width: 'auto', height: '32px', borderRadius: '6px', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                            <button onClick={handleImageUpload} disabled={loading} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', width: 'auto', height: '32px', borderRadius: '6px', padding: '0 12px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                Translate
                            </button>
                        </div>
                    )}
                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="#a1a1aa" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message or upload image..."
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
