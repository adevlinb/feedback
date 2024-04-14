import {createContext, useState, useRef, useEffect } from "react";
import * as usersAPI from "../utilities/users-api";
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


    useEffect(() => {
        async function getUser() {
            if (!user) {
                const results = await usersAPI.getUser();
                setUser(results);
            }
            
            const updatedLocation = await geolocationAPI.geolocationSetup();
            setGeolocation(updatedLocation);
            socket.socketConfig(user, setMessages, setMyChats, setChatUsers)
            socket.socket.on("connection", socket.setUserOnline(selectedChat));
            // if (location.pathname !== "/home/messages" && location.pathname !== "/book/:bookId") {
            //     setSelectedChat(null);
            //     socket.leaveRoom();
            // }
        }
        getUser();
    }, [user])

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