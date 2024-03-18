import React from 'react';
import Auth from './components/auth';
import Whatsapp from './components/Whatsapp';
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Users from './components/users';
const App = () => {

  const user = window.localStorage.getItem("user")

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='home' element={<Whatsapp user={user}/>}/>
      <Route path='/users' element={<Users/>}/>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
