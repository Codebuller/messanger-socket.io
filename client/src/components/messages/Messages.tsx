import  { Message } from '../chat/Chat'
import styles from './Messages.module.css'
const Messages = ({messages,name}:{messages:Message[],name:string}) => {
  return (
    <>
      { messages.map(({user, message},i)=>{
        const isMe = name.trim().toLowerCase() === user.name.trim().toLowerCase();
        const className = isMe ? styles.me : styles.user;
        return(
        <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{user.name}</span>
                <div className={styles.text}>{message}</div>
             </div>)
      })
      }
    </>
  )
};

export default Messages;
