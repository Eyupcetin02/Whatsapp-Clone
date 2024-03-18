import React, { useState } from 'react';
import { authRegister , authlogin} from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import "./auth.css"
const Auth = () => {
    const dispatch = useDispatch()

    const [state , setState] = useState({username : "" , email : "" , password : ""})
    const [auth , setAuth] = useState(true)

    const authFunc = (e)=>{

        setState({...state , [e.target.name] : e.target.value})
    }

   const setauthfunc = ()=>{
    setAuth(!auth)
    console.log(auth)
   }
   const loginFunc = ()=>{
console.log(2)
    dispatch(authlogin(state))
    
   }

    const reqFunc = ()=>{
        dispatch(authRegister(state))
    }


    return (
        <div className='authContainer'>
        <div className='authChildContainer'>
            {auth && <input type="text" placeholder='username' value={state.name} onChange={authFunc} name='username'/>}
            <input type="text" placeholder='email' value={state.email} onChange={authFunc} name='email'/>
            <input type="text" placeholder='password'  value={state.password} onChange={authFunc} name='password'/>
            <span onClick={setauthfunc} className='span'>{auth ? "or login" : "or signin"}</span>
            <div className='buttonDiv'>{auth ? <span onClick={reqFunc}>register</span> : <span onClick={loginFunc}>login</span>}</div>
        </div>
            
        </div>
    );
}

export default Auth;
