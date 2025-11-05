import Header from "../components/Header";
import ChatRoom from "../components/Chat";

const ChatPage = () => {
   
    const staticChatId = "chats"; 

    return (
        <>
            <Header/>
            <ChatRoom chatId={staticChatId} /> 
        </>
    )
}

export default ChatPage;