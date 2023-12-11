
import { dbConnect } from "../route";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
<<<<<<< HEAD
    const collection = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();
    console.log(qData, data);

=======
    const {client, collection} = await dbConnect("member");
    let data = await collection.find({id: qData.id, password: qData.pw}).toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(data);
}