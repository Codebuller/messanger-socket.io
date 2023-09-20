import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import  { io, Socket } from "socket.io-client";
import styles from './Chat.module.css'
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import Messages from "../messages/Messages";
const socket: Socket = io('http://localhost:5000')
export type Message = {user: {name:string}, message:string }
const Chat = () => {
  
  
  const [params,setParams] = useState({room:'',name:''});
  const [state,setState] = useState<Message[]>([]);
  const [message,setMessage] = useState<string>('')
  const [users,setUsers] = useState<number>(0);
  const {search} = useLocation()
  const [isOpen,setOpen] = useState(false)
  const nav = useNavigate();
  useEffect(()=>{
    socket.on('joinRoom',({data:{ users }})=>{
      setUsers(users.length)
    })
   const searchParams = Object.fromEntries(new URLSearchParams(search))
   setParams(searchParams as {room:string,name:string})
   socket.emit('join',searchParams);
   socket.on('message',({ data }:{data: {user: {name:string}, message:string } }
)=>{
    setState(( state)=>[...state , data])
    
   })
  }, [])

  const leftRoom = ()=>{
    socket.emit('leftRoom', params )
     
    nav('/')
  }
  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
    if(!message)
      return undefined;

      socket.emit('sendMessage', {message, params})
      setMessage('')
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {setMessage(e.target.value);}
  const handleEmoji = ( emojiData:EmojiClickData ) => {setMessage((inputValue) => inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji));}
  
  return (
  <div className={styles.wrap}>
    <div className={styles.header}>
    <div className={styles.title}>{params?.room ?? ''}</div>
    <div className={styles.users}>{`${users} users in this room`}</div>
    <button className={styles.left} onClick={leftRoom}>Left the room</button>
    </div>
    <div className={styles.messages}>
    <Messages messages={state} name={params.name}/>
    </div>
    <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
    <div className={styles.input}>
      <input 
        value={message}
        onChange={handleChange}
        placeholder="What do you want to write?"
        
        />
      </div>
      <div className={styles.imoji}>
      <img onClick={()=>setOpen(!isOpen)} src="/imoji.svg" alt="Sorry" />
        {isOpen &&  (<div className={styles.imojies}>
          <EmojiPicker onEmojiClick={handleEmoji}/>
        </div>)
        }   
      </div>
      <button type="submit" onSubmit={handleSubmit} className={styles.button}>

      </button>
    </form>
  </div>
  )
};

export default Chat;
