import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteChats, getChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
type Message={
  role:string,
  content:string
};
const Chat = () => {
  const navigate=useNavigate();
  const inputRef=useRef<HTMLInputElement|null>(null)
  const auth=useAuth();
  
  const [chatMessages,setChatMessages]=useState<Message[]>([]);

  useEffect(()=>{
    if(!auth?.user)
      return navigate("/login");
  })
  // get the chats
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);


  const handleSubmit=async ()=>{
    const content=inputRef.current?.value as string;
   if(inputRef && inputRef.current){
    inputRef.current.value="";
   }
   const newMessage:Message={role:"user",content};
   setChatMessages((prev)=>[...prev,newMessage])
    // console.log(inputRef.current?.value)

    // send api request 
    const chatData= await sendChatRequest(content);
    setChatMessages([...chatData.chats])
  }
  
  // delete chats
  
  const handleDeleteChats= async()=>{
    try{
// toast.loading("Deleting chats.",{id:"Delete"})
    
 await deleteChats();
  
    toast.success("Chats deleted.",{id:"Delete"})
    setChatMessages([])
  
  
    }catch(error){
     toast.error("Unable to delete chats.",{id:"Delete"})
    }
  
  }
  
  return (
    <Box
  sx={{
    display: 'flex',      // Use flexbox for layout
    flex: 1,              // Make the parent container flex to take full space
    width: '100%',
    height: '100%',
    mx: 'auto',
    gap: 3
  }}
>
  {/* First Box: Fixed size on larger screens, hidden on smaller ones */}
  <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' }, flexShrink: 0 }}>
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '60vh',
        bgcolor: 'rgb(17,29,39)',
        borderRadius: 5,
        flexDirection: 'column',
        mx: 3
      }}
    >
      <Avatar sx={{ mx: 'auto', my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
        {/* {auth?.user?.name[0]} */}
        {/* {auth?.user?.name.split(" ")[1][0]} */}
      </Avatar>
      <Typography sx={{ mx: 'auto', fontFamily: "work sans" }}>
        You are talking to a ChatBOT
      </Typography>
      <Typography sx={{ mx: 'auto', fontFamily: "work sans", my: 4, p: 3 }}>
        You can ask some questions related to programming, business, education, etc.
      </Typography>
      <Button
      onClick={handleDeleteChats}
        sx={{
          width: '200px',
          my: 'auto',
          color: 'white',
          fontWeight: 700,
          borderRadius: 3,
          mx: 'auto',
          bgcolor: red[300],
          ":hover": {
            bgcolor: red.A400
          }
        }}
      >
        Clear Conversation
      </Button>
    </Box>
  </Box>

  {/* Second Box: Takes up the remaining space */}
  <Box
    sx={{
      display: 'flex',
      flex: 1,              // Make this box take up all remaining space
      flexDirection: 'column',
      mx: 'auto',
      px: 3
    }}
  >
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: '48px',
        color: 'white',
        mx: 'auto',
        
        fontWeight: 600
      }}
    >
      Model-Gemini-1.5-pro
    </Typography>
    <Box
      sx={{
        width: '100%',
        height: '60vh',
        borderRadius: 3,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        overflowY: 'auto'
      }}
    >
      {/* Chat messages */}
      {chatMessages?.map((chat,i) => {
        return <ChatItem key={i} content={chat.content} role={chat.role} />;
      })}
    </Box>

    {/* Input area */}
    <div
      style={{
        width: '100%',
        
        borderRadius: 8,
        backgroundColor: 'rgb(17,27,39)',
        display: 'flex',
        margin: 'auto'
      }}
    >
      <input
      ref={inputRef}
        type="text"
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: '30px',
          border: 'none',
          outline: 'none',
          color: 'white',
          fontSize: '20px'
        }}
      />
      <IconButton onClick={handleSubmit} sx={{ ml: 'auto', color: 'white',mx:1 }}>
        <IoMdSend />
      </IconButton>
    </div>
  </Box>
</Box>

  )
}

export default Chat