import dbConnect from "../../db";

export async function GET(req, { params }) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const { client, collection } = await dbConnect("dPics");
    const data = await collection.find().toArray();
    await client.close();
    return Response.json(data);
}