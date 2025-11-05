
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

function ChatRoom({ chatId }) {
    // ... (մնացած կոդը)

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !currentUser) return;

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesCollectionRef, {
            text: newMessage,
            senderId: currentUser.uid, // Ուղարկողի ID
            timestamp: serverTimestamp(), // Firebase-ի կողմից ստեղծված ժամանակի կնիք
        });

        setNewMessage('');
    };

    return (
    
    <>
    </>
    );
}

export default ChatRoom;
