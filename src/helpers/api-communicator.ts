import axios from "axios"

export const signUpUser=async(name:String,email:string,password:string)=>{
    const res= await axios.post("/users/signUp",{name,email,password});
    // console.log(res)
    if(res.status!==201){
        throw new Error("Unable to SignUp")
    }
    const data=await res.data;
    return data;
}

export const loginUser=async(email:string,password:string)=>{
    const res= await axios.post("/users/login",{email,password});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to login.")
    }
    const data=await res.data;
    return data;
}

export const logoutUser=async()=>{
    const res= await axios.get("/users/logout");
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to logout.")
    }
    const data=await res.data;
    return data;
}

export const checkAuthStatus=async()=>{
    const res= await axios.get("/users/auth-status");
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to authenticate.")
    }
    const data=await res.data;
    return data;
}

// get all the chats
export const getChats=async()=>{
    
    const res=await axios.get('/chat/');
    if(res.status!=200)
        throw new Error("Unable to get data.")
    const data=await res.data;
    return data;
}


export const sendChatRequest=async(message:string)=>{
    const res= await axios.post("/chat/new",{message});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to send chat.")
    }
    const data=await res.data;
    return data;
}

// delete chats
export const deleteChats=async()=>{
    const res=await axios.delete('/chat/deleteChats');
    if(res.status!=200)
        throw new Error("Unable to delete.")
    const data=await res.data;
    return data;
}