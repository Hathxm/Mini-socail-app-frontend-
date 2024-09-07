import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { FiSend, FiPaperclip, FiEye, FiDownload } from 'react-icons/fi';
import moment from 'moment';

const ChatComponent = ({ isOpen, onClose, userId, otherUserId, username, sendername }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const wsRef = useRef(null);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMessages([]);
        
        const [firstId, secondId] = [userId, otherUserId].sort();
        wsRef.current = new W3CWebSocket(`ws://localhost:8000/ws/chat/${firstId}/${secondId}`);
 
        wsRef.current.onopen = () => {
            console.log('Connected to the chat server');
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        wsRef.current.onclose = () => {
            console.log('Disconnected from the chat server');
        };

        return () => {
            wsRef.current.close();
        };
    }, [userId, otherUserId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if ((message.trim() || selectedFile) && wsRef.current) {
            const messageData = { message, sendername, file: selectedFile };
            wsRef.current.send(JSON.stringify(messageData));
            setMessage('');
            setSelectedFile(null);
            fileInputRef.current.value = '';
        }
    };

    const formatTimestamp = (timestamp) => {
        return moment(timestamp).format('h:mm a');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg">
                    <p className="font-bold text-lg">{username}</p>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        Close
                    </button>
                </div>
                <div className="flex flex-col p-4 h-96 overflow-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex w-full mt-2 space-x-3 ${msg.sendername === sendername ? 'ml-auto justify-end' : ''}`}>
                            <div>
                                <div className={`${msg.sendername === sendername ? 'bg-blue-600 text-white' : 'bg-gray-300'} p-3 rounded-lg`}>
                                    {msg.file_url && (
                                        <div className="mb-2">
                                            {msg.file_url.endsWith('.jpg') || msg.file_url.endsWith('.png') || msg.file_url.endsWith('.jpeg') ? (
                                                <img className="max-h-64 w-auto rounded" src={msg.file_url} alt="Uploaded File" />
                                            ) : msg.file_url.endsWith('.mp4') || msg.file_url.endsWith('.mkv') ? (
                                                <video className="max-h-64 w-auto rounded" controls>
                                                    <source src={msg.file_url} type="video/mp4" />
                                                </video>
                                            ) : msg.file_url.endsWith('.pdf') ? (
                                                <div className="relative">
                                                    <embed src={msg.file_url} type="application/pdf" width="100%" height="400px" />
                                                    <a
                                                        href={msg.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute top-2 right-2 text-teal-600"
                                                    >
                                                        <FiEye className="w-6 h-6" />
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <FiDownload className="w-5 h-5 text-gray-600" />
                                                    <a href={msg.file_url} download className="text-teal-600">
                                                        {msg.file_url.split('/').pop()}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <p className="text-sm">{msg.message}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">{formatTimestamp(msg.timestamp)}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <form onSubmit={sendMessage} className="bg-gray-300 p-4 flex items-center rounded-b-lg">
                    <FiPaperclip className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => fileInputRef.current.click()} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {selectedFile && (
                        <div className="ml-3 flex items-center space-x-2">
                            <span className="text-gray-800">{selectedFile.name}</span>
                            <button onClick={() => setSelectedFile(null)} className="text-red-500">Remove</button>
                        </div>
                    )}
                    <input
                        className="flex-1 h-10 p-2 border rounded-l-lg text-sm"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message…"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg ml-2">
                        <FiSend className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;
