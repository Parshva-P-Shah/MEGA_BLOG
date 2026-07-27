import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children,authentication = true}) {

    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus= useSelector((state)=> state.auth.status);
    useEffect(()=>{
        if(authentication && authStatus !== authentication){ //true && false!=true so true && true 
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){ // false && true!=true so false && false 
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

