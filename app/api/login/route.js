
import { dbConnect } from "../route";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();

    await client.close();
    return Response.json(data);
}