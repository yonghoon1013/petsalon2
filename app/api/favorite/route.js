import dbConnect from "../db";

export async function GET(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("favorite");
    await collection.insertOne({key: qData.key, sKey: qData.sKey, objKey:qData.objKey});
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("favorite");
    await collection.deleteOne({key: qData.key});
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json(dataGet);
}
