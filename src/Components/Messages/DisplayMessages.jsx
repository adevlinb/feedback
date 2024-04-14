// IMPORTS
import { useState, useEffect, useRef, useContext } from "react";
import { User } from "../../../context/UserContext";
import { ProfileIcon } from "../../../utilities/constants";
import { Link } from "react-router-dom";


// APIS
import * as chatAPI from "../../../utilities/chat-api";
import * as socket from "../../../utilities/socket";

// COMPONENTS


export default function DisplayMessages() {
    const { selectedChat, chatUsers, setMyChats, messages, setMessages, userProfile } = useContext(User);
    const [members, setMembers] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const lastMessageRef = useRef(null);

    console.log(selectedChat, messages, "messages component")

    useEffect(() => {
        if (!selectedChat) return;
        async function getMessagesAndSetMembers() {
            const memberList = selectedChat?.members.reduce((acc, m) => {
                acc[m] = false;
                return acc;
            }, {});
            setMembers(memberList)
            const [retrievedMessages, userChats] = await chatAPI.getMessages(selectedChat._id);
            setMessages(retrievedMessages);
            setMyChats(userChats);
        }
        getMessagesAndSetMembers()
    }, [selectedChat, setMessages, setMyChats]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'instant', block: "end", });
    }, [messages]);


    async function handleSubmit(evt) {
        evt.preventDefault();
        const updatedMembers = Object.keys(members).reduce((acc, m) => {
            if (m in chatUsers.current && chatUsers.current[m].online && chatUsers.current[m].room === selectedChat._id) {
                acc[m] = true;
            }
            return acc;
        }, { ...members })
        const [newMsg, userChats] = await chatAPI.addMessage(selectedChat._id, { message: newMessage, members: updatedMembers });
        const updatedMessages = [...messages, newMsg];
        socket.emitMessage(newMsg);
        setMessages(updatedMessages);
        setMyChats(userChats);
        setNewMessage("")
    }

    if (!selectedChat) return <div className="msgs-container xyla-back vertical just-between"></div>

    return (<div className="msgs-container">
        <div className="msg-bottom overflow pl">
            {messages.map(msg => (
                <div key={msg._id} className={`vertical ${msg.sender._id === userProfile._id ? "align-end" : "align-start"}`}>
                    <Link to={msg.sender._id === userProfile._id ? "/profiles/userProfile" : `/profiles/${msg.sender._id}`} state={{ footer: "social" }} className={`vertical ${msg.sender._id === userProfile._id ? "align-end" : "align-start"}`}>
                        {msg.sender.pic ? <img src={msg.sender.pic} alt="profile pic" className='message-profile-pic' /> : <ProfileIcon />}
                        <small >{msg.sender.name}</small >
                    </Link>
                    <h3>{msg.message}</h3>
                </div>
            ))}
            <div ref={lastMessageRef} />
        </div>
        <form onSubmit={handleSubmit} className="msg-top pl bt-1-solid-bl">
            <input placeholder="message" type="text" name="newMessage" value={newMessage} onChange={(evt) => setNewMessage(evt.target.value)} />
            <button type="submit">Send Message</button>
        </form>
    </div>)
}