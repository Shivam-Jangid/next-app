"use client";
import Link from "next/link";
import React, { useEffect, useState }  from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
export default function SignUpPage() {
  const router = useRouter();
  const [user,SetUser] = useState({
    email:"",username:"",password:""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading ,setLoading] = useState(false);
  const onSignUp = async ()=>{
    try {
      setLoading(true);
     const response = await axios.post("/api/user/signup",user);
     console.log('signup success',response.data);
     router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }finally {
      setLoading(false)
  }
  }
  useEffect(()=>{
    if(user.email.length>0 && user.username.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user]);
  return (
    <div className="bg-black h-screen flex justify-center items-center flex-col">
      <div>
    <h1 className="text-5xl text-pink-500 font-bold font-mono pb-10">
      {loading?"This would take a minute....":"Phle Sign Up !!"}
    </h1>
    <div className="label-heads">Email</div>
    <input id="email" value={user.email} onChange={(e)=>{SetUser({...user,email:e.target.value})}} className="input-css" type="email" placeholder="Email"/>
    <div className="label-heads pt-7">Username</div>
    <input id="username" value={user.username} onChange={(e)=>{SetUser({...user,username:e.target.value})}} className="input-css" type="text" placeholder="Metha"/>
    <div className="label-heads pt-7">Password</div>
    <input id="password" onChange={(e)=>{SetUser({...user,password:e.target.value})}} className="input-css" type="password" placeholder="********"/>
    <div className="flex justify-center pt-9 pb-3">
    <button className="transition-all text-black bg-pink-500 rounded px-10 py-3 font-semibold text-lg hover:bg-pink-50
    hover:shadow-lg hover:shadow-pink-500/50
    hover:rounded-lg
    "
    onClick={onSignUp}
    >{buttonDisabled?"Fill The Feilds":"Sign Up"}</button>
    </div>
    <div className="text-center font-semibold py-4 text-pink-400 text-base ">Already a User? <Link className="text-green-400 underline hover:decoration-2 hover:text-green-500" href="/login">Log in</Link></div>
    </div>
    </div>
  )
}
