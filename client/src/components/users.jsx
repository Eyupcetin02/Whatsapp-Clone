import React, { useState } from 'react';
import axios from "axios"

const Users = () => {

    const [state , setState] = useState("")

    const message = (e)=>{

            setState(e.target.value)
            console.log(state)
    }

    const createSchema = async()=>{

        const schema = await axios.post("http://localhost:5000/message/users" , {user1 : "eyup" , user2 : "eren" , message :  state})

    }

    return (
        <div>
            <input type="text" value={state} onChange={message} />
            <button onClick={createSchema}>tııığk</button>
        </div>
    );
}

export default Users;
