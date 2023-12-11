
import { dbConnect } from "../route";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();
    console.log(qData, data);

    return Response.json(data);
}