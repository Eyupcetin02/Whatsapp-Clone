import React, { useEffect, useState } from 'react';
import "./body.css"
import { IoSend } from "react-icons/io5";
import axios from 'axios';
const Messagebody = ({user , user2}) => {

    const [state , setState] = useState("")
    const [mesaj , setMesaj] = useState([])


    const fetchMessages = async () => {
        try {
            const allMessage = await axios.post("http://localhost:5000/message/getAllMessage", {user1: user , user2 : user2});
            console.log(allMessage.data)
            setMesaj(allMessage.data || []);
           
            
        } catch (error) {
            console.error("hata:", error);
        }
    };

    useEffect(() => {
       
        
        fetchMessages();
        
    }, [user , user2]);




    const messageFunc = (e)=>{
        setState(e.target.value)
        
    }

    const sendmessageFunc = async()=>{

        const response = await axios.post("http://localhost:5000/message/users" , {user1 : user , user2 : user2 , message : state })

        console.log(response.data)
        setState("")
        fetchMessages()
    }

   const enterFunc = async(e)=>{
        if(e.key === "Enter"){
            const response = await axios.post("http://localhost:5000/message/users" , {user1 : user , user2 : user2 , message : state})
            setState("")
            fetchMessages()
        }
    }

    

    return (
        <div className='bodycontainer'>
            <div className='navbar'>

            </div>
            <div className='message-container'>

            
            <div className='message'>
               {mesaj.map((item , index)=>{

            const date = new Date(item.date);
            const options = {
                        timeZone: 'Europe/Istanbul',
                        hour: 'numeric',
                        minute: 'numeric'
                };
                const turkishTime = date.toLocaleTimeString('tr-TR', options);
                const kişi = window.localStorage.getItem("user")
                const sorgu = (item)=>{
                    if (item.user === kişi) {
                        return true
                    }
                    else{
                        return false
                    }
                }
                return(
                 <div key={index} className={sorgu(item) ? "truemessageBox" : "falsemessageBox"}>
                 <span className='messageSpan'>{item.message}</span>
                 <div className='dateSpan'>{turkishTime}</div>
             </div>)})}
            </div>
            </div>
            <div className='input'>
                <input onKeyDown={enterFunc} value={state} placeholder='Bir mesaj yazın' onChange={messageFunc} type="text" />
                <button className='iconeButton' onClick={sendmessageFunc}><IoSend/></button>
            </div>
        </div>
    );
}

export default Messagebody;
