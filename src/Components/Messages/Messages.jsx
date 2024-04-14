// IMPORTS
import { useState, useEffect, useContext } from "react";
import { AddItemIcon } from "../../../utilities/constants";
import { User } from "../../../context/UserContext";

// APIS
import * as chatAPI from "../../../utilities/chat-api";
import * as profilesAPI from "../../../utilities/profiles-api";
import * as socket from "../../../utilities/socket";


// COMPONENTS
import CreateChatModal from "../../Modals/CreateChatModal";
import DisplayMessages from "./DisplayMessages";


export default function Messages() {
    const { userProfile, myChats, setMyChats, chatUsers, selectedChat, setSelectedChat, messages, setMessages } = useContext(User);
    const [allFriends, setAllFriends] = useState([]);
    const [showChatModal, setShowChatModal] = useState(false);

    function selectChat(chat) {
        console.log(chat, "selecting chat here")
        socket.joinRoom(chat._id)
        setSelectedChat(chat);
    }

    async function createChat(chatInfo) {
        const [userChats, currMsgs, currChat] = await chatAPI.createChat(chatInfo);
        setMyChats(userChats);
        setSelectedChat(currChat);
        setMessages(currMsgs);
        socket.joinRoom(currChat._id)
        socket.newChat("new_chat", chatInfo.members);
    }

    useEffect(() => {
        async function getFriendsAndChats() {  
            const friends = await profilesAPI.getAllFriends();
            setAllFriends(friends)
        }
        getFriendsAndChats()
    }, [])

    return (
        <div className="message-container">
            <div className="horizontal msg-top">
                <h3>Create New message etc up here</h3>
                <div onClick={()=> setShowChatModal(!showChatModal)}><AddItemIcon title="CREATE" /></div>
            </div>
            <div className="horizontal msg-bottom overflow">
                <div className="chat-container overflow">
                    <h3>Chats:</h3>
                    {myChats.map(chat => (
                        <div key={chat._id} onClick={() => selectChat(chat)}>
                            <h5>{chat.chatName}</h5>
                            <h5>{chat.UNREAD_MSGS[userProfile._id] === 0 ? "" : chat.UNREAD_MSGS[userProfile._id]}</h5>
                        </div>
                    ))}
                </div>
                <DisplayMessages selectedChat={selectedChat} chatUsers={chatUsers} setMyChats={setMyChats} messages={messages} setMessages={setMessages} userProfile={userProfile}/>
            </div>
            {showChatModal && <CreateChatModal  setShowChatModal={setShowChatModal} showChatModal={showChatModal} createChat={createChat} friends={allFriends} userProfile={userProfile}/>}
        </div>

    )
}

