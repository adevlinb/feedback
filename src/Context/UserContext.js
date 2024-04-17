import { createContext, useState, useEffect } from "react";
import * as usersAPI from "../utilities/users-api";
import * as chatAPI from "../utilities/chat-api";
import * as socket from "../utilities/socket";
import * as geolocationAPI from "../utilities/geolocation-api";

const User = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [myChats, setMyChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUsers, setChatUsers] = useState({});
    const [geolocation, setGeolocation] = useState({});
    const [socketConnection, setSocketConnection] = useState(null);

    
    useEffect(() => {
        async function initialSignIn() {
            const userData = await usersAPI.getUser();
            setUser(userData);
            const userChats = await chatAPI.getUserChats();
            setMyChats(userChats);
            const userLocation = await geolocationAPI.geolocationSetup();
            setGeolocation(userLocation);
        }
        if (!user) initialSignIn();
    }, [user])


    useEffect(() => {
        function socketConfig() {
            socket.socketConfig(user, geolocation, setMessages, setMyChats, setChatUsers)
            socket.socket.on("connection", socket.setUserOnline(selectedChat));
            setSocketConnection(socket.socket);
        }
        if (user) socketConfig()
    }, [selectedChat, geolocation, user, setMessages, setMyChats, setChatUsers, setSelectedChat]);


    // socket recovery if error / connection dropped
    if (socketConnection && user) {
        socketConnection.on("socket reset client", () => {
        socket.socketConfig(user, geolocation, setMessages, setMyChats, setChatUsers)
        socket.socket.on("connection", socket.setUserOnline(selectedChat));
        })
    }
    return (
        <User.Provider value={{ user, setUser, myChats, setMyChats, selectedChat, setSelectedChat, messages, setMessages, chatUsers, setChatUsers }}>
            {children}
        </User.Provider>
    )
}

export { User, UserContext };