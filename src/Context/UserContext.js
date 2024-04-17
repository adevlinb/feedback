import {createContext, useState, useEffect } from "react";
import * as usersAPI from "../utilities/users-api";
import * as chatAPI from "../utilities/chat-api";
import * as socket from "../utilities/socket";
import * as geolocationAPI from "../utilities/geolocation-api";

const User = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [myChats, setMyChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUsers, setChatUsers] = useState({});
    const [geolocation, setGeolocation] = useState({});
    const [socketConnection, setSocketConnection] = useState(null);

    // useEffect(() => {
    //     function resetSocket() {
    //         console.log("resetSocket func 21", socketConnection.recovered)
    //         if (user && !socketConnection) {
    //             console.log("resetSocket func 23 and")
    //             socket.socketConfig(user, setMessages, setMyChats, setChatUsers)
    //             socket.socket.on("connection", socket.setUserOnline(selectedChat));
    //             setSocketConnection(socket.socket);
    //         }
    //     }
    //     resetSocket()
    // }, [user, socketConnection])

    useEffect(() => {
        async function initialSignIn() {
            if (!user) {
                const userData = await usersAPI.getUser();
                setUser(userData);
            }
            
        }
        initialSignIn();
    }, [user])


    useEffect(() => {
        async function getUserData() {
            if (user) {
                const userChats = await chatAPI.getUserChats();
                setMyChats(userChats);
                const updatedLocation = await geolocationAPI.geolocationSetup();
                setGeolocation(updatedLocation);
                socket.socketConfig(user, setMessages, setMyChats, setChatUsers)
                socket.socket.on("connection", socket.setUserOnline(selectedChat));
                setSocketConnection(socket.socket);
            }
        }
        getUserData();
    }, [user])

    if (socketConnection) socketConnection.on("socket reset client", () => {
        socket.socketConfig(user, setMessages, setMyChats, setChatUsers)
        socket.socket.on("connection", socket.setUserOnline(selectedChat));
    })

    // useEffect(() => {

    //     function socketConfig() {
    //         if (user && userProfile?.acctType === "social")  {
    //             socket.socketConfig(userProfile, setMessages, setMyChats, setChatUsers)
    //             socket.socket.on("connection", socket.setUserOnline(selectedChat));
    //             if (location.pathname !== "/home/messages" && location.pathname !== "/book/:bookId") {
    //                 setSelectedChat(null);
    //                 socket.leaveRoom();
    //             }
    //         }
    //     }

    //     socketConfig()

    // }, [selectedChat, location, user, userProfile, userRTCID, setMessages, setMyChats, setChatUsers, setSelectedChat]);

    return (
        <User.Provider value={{ user, setUser, myChats, setMyChats, selectedChat, setSelectedChat, messages, setMessages, chatUsers, setChatUsers }}>
            {children}
        </User.Provider>
    )
}

export { User, UserContext };