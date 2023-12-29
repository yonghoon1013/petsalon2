<<<<<<< HEAD
import { dbConnect } from "../route";

export async function GET(req){
    const collection = await dbConnect("member");
    const {id} = Object.fromEntries(req.nextUrl.searchParams);
                 
    let data = await collection.find({id}).toArray();
    
=======
import dbConnect from "../db";

export async function GET(req){
    const {client, collection} = await dbConnect("member");
    const {id} = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({id}).toArray();
    
    await client.close();
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    if(data.length > 0) {return Response.json(true);}
    else {return Response.json(false);}
}