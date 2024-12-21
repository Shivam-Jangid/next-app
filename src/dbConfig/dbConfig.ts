import mongoose from 'mongoose';

export async function connect (){
 try{
    mongoose.connect(process.env.MONGO_URI! );
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('mongo-db connected successfully!');
    })
    connection.on('error',(err)=>{
        console.log('Mongo-Db connection failed.'+err);
        process.exit();
    })
    
 }  
 catch(err){
    console.log("something went wrong !");
    console.log(err);
 } 
}