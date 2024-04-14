import {createContext, useState, useRef, useEffect } from "react";
import * as UsersService from "../utilities/users-service";
import * as usersAPI from "../utilities/users-api";
import * as socket from "../utilities/socket";

const User = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    // const location = useLocation(); -> find location package for react native

    useEffect(() => {
        async function getUser() {
            if (!user) {
                const results = await UsersService.getUser();
                setUser(results);
                console.log(user, "user")
            }
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
        <User.Provider value={{user , setUser }}>
            {children}
        </User.Provider>
    )
}

export { User, UserContext };