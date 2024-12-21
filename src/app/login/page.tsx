"use client";
import Link from "next/link";
import React, { useEffect, useState }  from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from 'axios';
export default function LoginPage() {
  const router = useRouter();
  const [user,SetUser] = useState({
    email:"",password:""
  });
  const [loading,setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onLogin = async ()=>{
      try {
        setLoading(true);
        // console.log(user)
        const response = await axios.post("api/user/login",user);
        console.log("Login succesful", response.data);
        toast.success("Login successfully !");
        router.push("/profile");
      } catch (err:any) {
        console.log(err.message);
        toast.error(err.message);
      }
      finally{
        setLoading(false);
      }
  }
  useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
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
{loading?"Processing":"Let's Login"}
    </h1>
    <div className="label-heads">Email</div>
    <input id="email" value={user.email} onChange={(e)=>{SetUser({...user,email:e.target.value})}} className="input-css" type="email" placeholder="email"/>
    <div className="label-heads pt-7">Password</div>
    <input id="password" onChange={(e)=>{SetUser({...user,password:e.target.value})}} className="input-css" type="password" placeholder="********"/>
    <div className="flex justify-center pt-9 pb-3">
    <button className="transition-all bg-pink-500 rounded px-10 py-3 font-semibold text-black text-lg hover:bg-pink:200 hover:text-pink-900 hover:bg-pink-50 hover:shadow-lg hover:shadow-pink-500/50 hover:rounded-lg
    "
    onClick={onLogin}
    >{buttonDisabled?"No Login":"Log in"}</button>
    </div>
    <div className="text-center font-semibold py-4 text-pink-400 text-base ">Not a User? <Link className="text-green-400 underline hover:decoration-2 hover:text-green-500" href="/signup">Sign Up</Link></div>
    </div>
    </div>
  )
}
