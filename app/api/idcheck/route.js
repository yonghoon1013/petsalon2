import { dbConnect } from "../route";

export async function GET(req){
<<<<<<< HEAD
    const collection = await dbConnect("member");
    const {id} = Object.fromEntries(req.nextUrl.searchParams);
                 
    let data = await collection.find({id}).toArray();
    
=======
    const {client, collection} = await dbConnect("member");
    const {id} = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({id}).toArray();
    
    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    if(data.length > 0) {return Response.json(true);}
    else {return Response.json(false);}
}