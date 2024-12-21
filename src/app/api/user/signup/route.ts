import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request:NextRequest){
    try {
       const reqBody = await request.json();
       const {username, email, password} = reqBody
      //  console.log(reqBody);
       //cheack User Already Exists
      const user = await User.findOne({email})
      if(user){
        return NextResponse.json({error:"User Already Exists"},{status:400});
      }
      // hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedpassword = await bcryptjs.hash(password,salt);
      const newUser = new User({
        username,
        email,
        password:hashedpassword
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
      return NextResponse.json({
        message:"User created succesfully",
        success:true,
        savedUser
      })
    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:500})
    }
}