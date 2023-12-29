import dbConnect from "../db";


export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find().toArray();

    console.log(req.url, req.method);
    await client.close();
    return Response.json(data);
}
