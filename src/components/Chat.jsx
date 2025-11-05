import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatRoom({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user] = useAuthState(auth);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!chatId) return;

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesCollectionRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user || !chatId) {
            console.warn("Հաղորդագրություն ուղարկել չհաջողվեց: Լրացրեք հաղորդագրությունը, մուտք գործեք կամ ընտրեք չաթ։");
            return;
        }

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesCollectionRef, {
            text: newMessage,
            senderId: user.uid,
            timestamp: serverTimestamp(),
            senderName: user.displayName || user.email || 'Անանուն', // Փոփոխված տող
            senderPhotoURL: user.photoURL || null,
        });

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-screen max-w-lg mx-auto border border-gray-200 rounded-2xl shadow-xl overflow-hidden font-sans bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex-grow p-4 overflow-y-auto bg-transparent custom-scrollbar">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 mt-5">Սկսեք զրույցը։</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end mb-4 max-w-[85%] ${msg.senderId === user?.uid ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
                                }`}
                        >
                            <img
                                src={msg.senderPhotoURL || 'https://via.placeholder.com/30'}
                                alt="sender avatar"
                                className={`w-8 h-8 rounded-full object-cover shadow-sm ${msg.senderId === user?.uid ? 'ml-2' : 'mr-2'}`}
                            />
                            <div
                                className={`p-3 rounded-2xl shadow-md relative break-words ${msg.senderId === user?.uid
                                        ? 'bg-orange-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                    }`}
                            >
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className={`font-semibold text-sm ${msg.senderId === user?.uid ? 'text-orange-100' : 'text-gray-700'}`}>
                                        {msg.senderName} {/* Սա կցուցադրի email-ը, եթե displayName չկա */}
                                    </span>
                                    <span className={`text-xs ${msg.senderId === user?.uid ? 'text-orange-200' : 'text-gray-500'} ml-3`}>
                                        {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-sm leading-tight">{msg.text}</p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex p-4 border-t border-gray-200 bg-white shadow-lg">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Մուտքագրեք հաղորդագրություն..."
                    className="flex-grow p-3 border border-gray-300 rounded-full mr-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                >
                    Ուղարկել
                </button>
            </form>
        </div>
    );
}

export default ChatRoom;