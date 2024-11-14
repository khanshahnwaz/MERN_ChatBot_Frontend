import { useEffect,useState } from "react";
import { Avatar, Box, Typography } from "@mui/material"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import hljs from 'highlight.js/lib/core';

// Dynamically import all languages
// import * as languages from 'highlight.js/lib/languages';
import 'highlight.js/styles/atom-one-dark.css';
// Import languages you need (to reduce bundle size, only import what you need)
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import ruby from 'highlight.js/lib/languages/ruby';
import cpp from 'highlight.js/lib/languages/cpp';
// Add other languages you need
import 'highlight.js/styles/atom-one-dark.css';

// Register languages you will use
hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('go', go);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('cpp', cpp);
// return array of code block
// every code block is encapsulated with three back ticks
function extractCodeFromString(message:String){
  if(message.includes("```")){
    console.log("back ticks found")
    const blocks=message.split("```");
    return blocks;
  }
  return null;
}

function isCodeBlock(str:String){
  return str.trim().length > 0 && (str.includes("{") || str.includes("}") || str.includes(";"));
}
const ChatItem = ({content,role}:{content:string,role:string}) => {


const messageBlocks=extractCodeFromString(content);

const [language, setLanguage] = useState<string | undefined>('plaintext');

// gets the chat from backend on refresh 
  useEffect(() => {
    const detectedLanguage = hljs.highlightAuto(content).language;
    setLanguage(detectedLanguage);
  }, [content]);


    
  return role==="assistant"?<Box sx={{display:"flex",p:2,bgcolor:"#004d5612",my:2,gap:2}}>
    <Avatar sx={{ml:"0"}}>
        <img src="openai.png" alt="openai" width={"30px"}/>
    </Avatar>
    <Box>
      {/* <Typography fontSize={"20px"}>{content}</Typography>
       */}
   
        {!messageBlocks && (<Typography sx={{fontSize:"20px"}}>{content}</Typography>)
       }

        {messageBlocks && messageBlocks.length && messageBlocks.map((block,index)=>isCodeBlock(block)?
     <SyntaxHighlighter key={index} language={language} style={coldarkDark}>
      {block}
     </SyntaxHighlighter>
       
       :<Typography sx={{fontSize:"20px"}}>{block}</Typography>)}
      
      </Box>
  </Box>:(
    <Box sx={{display:"flex",p:2,bgcolor:"#004d56",gap:2}}>
    <Avatar sx={{ml:"0",bgcolor:"black",color:"white"}}>
      
    </Avatar>
    <Box>
      <Typography fontSize={"20px"}>{content}</Typography></Box>
  </Box>
  )
}

export default ChatItem