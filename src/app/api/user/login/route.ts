import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
connect();
export async function POST (request:NextRequest){
        try {
            const reqBody = await request.json();
            const {email, password} = reqBody;
            console.log(reqBody);
            const resUser = await User.findOne({email});
            if(!resUser){
                return NextResponse.json({message:"User not found"},
                {
                    status:400
                });
            }
            //cheack password
            const validPassword = await bcryptjs.compare(password, resUser.password);
            if (!validPassword) {
                return NextResponse.json({ message: "Invalid password" }, { status: 400 });
            }
            //create token data
            const tokenData = {
                id: resUser.__id,
                username:resUser.username,
                email:resUser.email
            }
            //create token
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
            const response = NextResponse.json({
                message:'Login successfully',
                success:true
            });
            response.cookies.set("token",token,{httpOnly:true});
            return response;
        } catch (error) {
            console.log(error)
            return NextResponse.json({error:error},{status:500})
        }
}