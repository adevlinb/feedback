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

    // const location = useLocation(); -> find location package for react native

    useEffect(() => {
        async function getUser() {
            if (!user) {
                const results = await usersAPI.getUser();
                setUser(results);
                console.log(results, "user")
            }
            
            console.log("user logged in, looking for location!")
            const updatedLocation = geolocationAPI.geolocationSetup();
            // console.log(updatedLocation, "up-lo");

            
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