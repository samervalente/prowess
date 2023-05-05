import { LoggedUser } from "@/protocols/auth";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

interface IUserContext {
    user: LoggedUser,
    setUser: Dispatch<SetStateAction<{
        name:string,
        imageUrl:string;
        token:string;
        countPosts: number;
    }>>,
    storageUser: (user: IUserContext["user"]) => void
}

 const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<IUserContext["user"]>()
    
    useEffect(() => {
       
    }, [user])

    function storageUser(user: IUserContext["user"]){
        localStorage.setItem('currentUser', JSON.stringify(user))
    }


    return (
        <UserContext.Provider value={{storageUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
}