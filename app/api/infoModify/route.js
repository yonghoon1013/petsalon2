import dbConnect from "../db";

export async function PUT(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set: {dDesc: qData.dDesc, dPrice: qData.dPrice, dTime1: qData.dTime1, dTime2: qData.dTime2, dAddress: qData.dAddress, dNumber1: qData.dNumber1, dNumber2:qData.dNumber2, dNumber3: qData.dNumber3}});
    const data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
}