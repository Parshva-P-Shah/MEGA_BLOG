import React,{useState} from "react";
import { useDispatch } from "react-redux";
import Service from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
function LogoutBtn() {
  const {refresh,setRefresh} =useState();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Service.logout()
    .then(() =>dispatch(logout()))
    .catch(()=>console.log("Your Are Session Has Already End!!!"));
  };
  return <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
