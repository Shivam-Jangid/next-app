import jwt from 'jsonwebtoken'
import {connect} from '@/dbConfig/dbConfig' 
import { NextRequest } from 'next/server'
connect()
export function getDataFromId(request:NextRequest){
    const token = request.cookies.get('token')?.value || ''
    const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
}