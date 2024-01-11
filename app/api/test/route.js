import dbConnect from "../db";

export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");

    const res = await collection.find({key: qData.key}).toArray();
    await collection.insertOne({id: res[0].id});
    const dataGet = await collection2.find().toArray();

    await client.close();
    return Response.json(dataGet);
}

