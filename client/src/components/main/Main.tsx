import React, { useState } from "react"
import styles from './Main.module.css'
import { Link } from "react-router-dom";

const Main = () => {

  const [values,setValues] = useState<{name:string,room:string}>({name:'',room:''});

  const handleChange = ({target:{value,name} }:{target:{value:string,name:string}}) =>{
    setValues({...values, [name]: value})
  }
  const handleClick = (e:React.MouseEvent) =>{
    const isDisabled = values.name.toString() +values.room.toString() === "" ? true : false;
    if(isDisabled)
    e.preventDefault()
  }
  
  return (
  <div className={styles.wrap}>
    <div className={styles.container}>
      <h1 className={styles.heading}>Join</h1>
      <form className={styles.form}>
        <div className={styles.group}>
          <input 
          value={values.name}
          onChange={handleChange}
          type="text"
          name='name' 
          placeholder="Your username"
          className={styles.input}
          autoComplete="off"
          required
          />
          </div>
           <div className={styles.group}>
          <input 
          value={values.room}
          onChange={handleChange}
          type="text"
          placeholder="Room"
          name='room' 
          className={styles.input}
          autoComplete="off"
          required
          />
          </div>
        
        <Link onClick={(e)=>{handleClick(e)}} className={styles.group} to={`/chat?name=${values.name}&room=${values.room}`}>
          <button type="submit" className={styles.button}>Sign in</button>
        </Link>
      </form>
    </div>
  </div>
  
  
  )
};

export default Main;
