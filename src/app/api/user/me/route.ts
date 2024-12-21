import { NextRequest, NextResponse } from "next/server";   
import User from "@/models/userModels";
import {connect} from '@/dbConfig/dbConfig'
import jwt from  'jsonwebtoken'
connect()
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userId = decodedToken.id;
        const user = await User.findOne({ _id: userId }).select('-password');
        if(!user){
            return NextResponse.json({ message: 'User not found' },{status:404});
        }
        console.log(userId);
        console.log(user);
        return NextResponse.json({ decodedToken,success:true});
    } catch (error:any) {
        return NextResponse.json({ message: error.message },{status:500});
    }
}