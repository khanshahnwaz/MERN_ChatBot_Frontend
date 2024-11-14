import { ReactNode, useContext, useEffect } from 'react';
import {createContext, useState} from 'react'
import { checkAuthStatus, loginUser, logoutUser, signUpUser } from '../helpers/api-communicator';
import toast from 'react-hot-toast';

type User={
    name:string,
    email:string,
}
type UserAuth={
    isLoggedIn:boolean,
    user:User | null;
    login:(email:string,password:string)=>Promise<void>;
   signUp:(name:string,email:string,password:string)=>Promise<void>;
   logout:()=>Promise<void>

}
const AuthContext=createContext<UserAuth|null>(null);
export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User|null>(null);
    const[isLoggedIn,setIsLoggedIn]=useState(false);

// fetch if the users cookie are valid then skip login
    useEffect(()=>{
        async function checkStatus(){
            const data=await checkAuthStatus();
            if(data){
                setUser({email:data.email,name:data.name})
                setIsLoggedIn(true)
            }
        }
        checkStatus()
    },[]);

    const login=async(email:string,password:string)=>{
        const data=await loginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };
    const signUp=async(name:string,email:string,password:string)=>{
        const data=await signUpUser(name,email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };


    const logout=async()=>{
  
      
        try{
          await logoutUser();
          
          setIsLoggedIn(false);
          setUser(null);
          
        }catch(err){
          toast.error("Logout failed.")
        }
       
    }
    const value={
        user,
        isLoggedIn,
        login,
        logout,
        signUp,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth=()=>useContext(AuthContext);