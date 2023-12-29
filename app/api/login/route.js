<<<<<<< HEAD

import { dbConnect } from "../route";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();
    console.log(qData, data);

=======
import dbConnect from "../db";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();

    await client.close();
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    return Response.json(data);
}