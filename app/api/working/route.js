import dbConnect from "../db";

export async function PUT(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set: {working: qData.working}});
    const data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
};