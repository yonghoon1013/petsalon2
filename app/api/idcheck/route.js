import dbConnect from "../db";

export async function GET(req){
    const {client, collection} = await dbConnect("member");
    const {id} = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({id}).toArray();
    
    await client.close();
    if(data.length > 0) {return Response.json(true);}
    else {return Response.json(false);}
}