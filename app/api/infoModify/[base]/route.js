import dbConnect from "../../db";

export async function PUT(req, {params}) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set: {nickname: qData.item.nickname, password: qData.item.password, info: qData.item.info, imgUrl: qData.imgUrl}});
    const data = await collection.find({key: qData.key}).toArray();

    console.log(params.base);

    await client.close();
    return Response.json(data);
};