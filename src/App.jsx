import { useState,useEffect } from 'react';
import {Outlet} from "react-router-dom";
import authservice  from './appwrite/auth';
import {useDispatch} from "react-redux";
import {Header,Footer} from "./components/index";
import './App.css'
import { login, logout } from './store/authSlice'; 
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
  authservice.getUser()
  .then((userData)=>{
    if(userData){
      dispatch(login(userData))
    } else{
      dispatch(logout());
    }
  })
  .finally(()=> setLoading(false))
},[])
return !loading ?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
  </div>
  </div>
):null;
}

export default App
