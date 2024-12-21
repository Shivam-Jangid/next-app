'use client';
export default function page({params}:any) {
  return (
    <div className="bg-gray-900 text-white flex justify-center items-center h-screen">  
        <h1 >Profile Page for
            <span className=" text-blue-500 px-4 text-5xl font-mono">
        {params.id}
            </span></h1>   
    </div>
  )
}
