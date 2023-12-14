import dbConnect from "../db";

export async function GET (req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    const data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
};

export async function PUT (req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set:{imgUrl: qData.imgUrl}});

    await client.close();
    return Response.json("사진 업로드됨");
};