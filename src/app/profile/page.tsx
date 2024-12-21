'use client'
import axios from "axios"
// import Link from "next/link"
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function profilePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const logout = async ()=>{
    try {
      setLoading(true);
      const response = await axios.get("/api/user/logout");
      console.log(response);
      toast.success('Logged Out Successfully');
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  }
  const pushProfilePage = async ()=>{
     const res = await axios.get('/api/user/me');
      const userId = res.data.decodedToken.id;
      router.push(`/profile/${userId}`);
  }
  return (
    <div className='min-h-screen bg-black  pt-10'>
      <div className='mx-24 flex  justify-between'>
      <span className='text-pink-600 text-3xl font-semibold hover:underline'>{loading?"Please Wait":'Profile Page'}</span>
      <div>
      <button className='transition-all h-14 bg-pink-500 rounded px-10 py-3 font-semibold text-black text-lg hover:bg-pink:200 hover:text-pink-950 hover:bg-pink-50'
      onClick={logout}
      >Log Out</button>
      <button  className="pl-10 text-lg font-mono font-semibold hover:underline"
      onClick={pushProfilePage}
      >Profile</button>
      </div>
    </div>
    </div>
  )
}
