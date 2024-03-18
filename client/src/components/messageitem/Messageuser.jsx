import React, { useEffect, useState } from 'react';
import "./user.css"
import { IoArrowBackOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios"

const Messageuser = ({setUser2 , user2}) => {

    const [state , setState] = useState([])

    useEffect(()=>{
        const getUsers = async()=>{

            const response = await axios.get("http://localhost:5000/api/getusers")
            setState(response.data.eyup)
        }

        getUsers()
    }, [])

    const exitFunc = ()=>{
            window.localStorage.clear()
            window.location = "/"
    }

    const userFunc = (item)=>{
        setUser2(()=>item.username)
    }

    return (
        <div className='usercontainer'>
            
            <IoArrowBackOutline onClick={exitFunc} style={{marginLeft:5 , marginTop:5, cursor:'pointer'}}/>
            {state.map((item , index)=>(
            <div key={index} className='users' onClick={()=>userFunc(item)}>
                <div className='profilimg'><FaRegUserCircle style={{fontSize:35 , margin:5}}/></div>
                <div className='username'>{item.username}</div>
                <div className='usermail'>{item.email}</div>
            </div>    
            ))}
        </div>
    );
}

export default Messageuser;
