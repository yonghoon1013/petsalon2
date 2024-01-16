import dbConnect from "../../db";

export async function PUT(req, {params}) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    const checking = await collection.find({key: qData.key, password: qData.item.cPassword}).toArray();
    if(qData.item.password == "") {
        await collection.updateOne({key: qData.key, password: qData.item.cPassword}, {$set: {nickname: qData.item.nickname, password: qData.item.cPassword, info: qData.item.info, imgUrl: qData.imgUrl}});
    } else {
        await collection.updateOne({key: qData.key, password: qData.item.cPassword}, {$set: {nickname: qData.item.nickname, password: qData.item.password, info: qData.item.info, imgUrl: qData.imgUrl}});
    }
    const data = await collection.find({key: qData.key}).toArray();

    await client.close();
    if(checking.length > 0){
        return Response.json(data);
    } else{
        return Response.json("checkfail");
    };
};