'use client';
import React,{ useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
export default function page() {
  const [user,setUser] = useState({
    email:"",username:"",id:""
  })
    useEffect(()=>{
      console.log('useEffect');
      axios.get('/api/user/me').then((res:any)=>{
        console.log(res.data.decodedToken);
        setUser(res.data.decodedToken);
      })
      
    },[])
  return (
    <div className="bg-gray-900 flex-col text-white flex justify-center items-center h-screen">  
        <span className="py-16">Username : 
            <span className=" text-blue-500 px-4 text-2xl font-mono">
        {user.username}
            </span></span>  
        <span>
          Email :<span className="text-blue-500 px-4 text-2xl font-mono">{user.email}</span>
          </span> 

          <span className="pt-56 text-lg font-semibold font-mono text-emerald-500">Let's go to main page <Link 
          className="transition-all text-2xl hover:text-blue-600 hover:underline"
           href={'/profile'}> Here</Link></span>
            
    </div>
  )
}
