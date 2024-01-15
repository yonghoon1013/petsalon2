import dbConnect from "../db";

export async function GET(req){
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    // let data = await collection.find({id: qData.id, password: qData.pw}).toArray();
    let data = await collection.find({ id: qData.id, password: { $regex: qData.pw } }).toArray();
    // let data = await collection.find({ id: qData.id, password: { $regex: `\\${qData.pw}` } }).toArray();

    await client.close();
    return Response.json(data);
}