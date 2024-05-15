import React, { useState } from 'react';
import Messagebody from './messageitem/Messagebody';
import Messageuser from './messageitem/Messageuser';
import "./whatsapp.css"
const Whatsapp = ({user}) => {
    const [user2 , setUser2] = useState("eyup")
    return (
        <div className='container'>
            <Messageuser setUser2={setUser2} user2={user2}/>
            <Messagebody user2={user2} user={user}/> 
        </div>
    );
}

export default Whatsapp;
