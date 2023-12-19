import dbConnect from "../db";

export async function PUT (req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set:{imgUrl: qData.imgUrl}});

    await client.close();
    return Response.json("사진 업로드됨");
};