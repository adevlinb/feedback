import {createContext, useState, useRef, useEffect} from "react";
import * as UsersService from "../utilities/users-service";
import * as usersAPI from "../utilities/users-api";

const User = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);

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

    return (
        <User.Provider value={{user , setUser }}>
            {children}
        </User.Provider>
    )
}

export { User, UserContext };