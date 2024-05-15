import React, { useEffect, useState } from 'react';
import "./user.css"
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

import axios from "axios"

const Messageuser = ({setUser2 , user2}) => {

    const [state , setState] = useState([])
    const [showOptions , setShowOptions] = useState(false)
    const [searchTerm,setSearchTerm] = useState("")

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

    const handleMenuClick = () => {
        setShowOptions(!showOptions);
    };

    const handleSearch = (event)=>{
        setSearchTerm(event.target.value);
    }

    const filteredUsers = state.filter((user) => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='usercontainer'>
            <div className='authInput'>
                <input type="text" placeholder='Ara...' onChange={handleSearch} />
                <CiMenuKebab onClick={handleMenuClick} style={{cursor:'pointer'}}/>
                {showOptions && (
                <div className="options">
                    <option onClick={exitFunc}>Çıkış</option>
                </div>
            )}
            </div>
            
            {filteredUsers.map((item , index)=>(
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
