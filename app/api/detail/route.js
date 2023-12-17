import dbConnect from "../db";

export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    console.log(qData);
    let data = await collection.find({key:qData.key}).toArray();
    console.log(data);
    await client.close();
    return Response.json(data);
}