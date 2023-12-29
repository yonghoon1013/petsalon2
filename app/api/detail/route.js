import dbConnect from "../db";

export async function GET(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({sKey: qData.sKey, objKey: qData.objKey}).toArray();

    // const likeCheck = data.some(item=>{
    //     return item.sKey === qData.sKey && item.objKey === qData.objKey;
    // })

    await client.close();
    if(data.length > 0){
        return Response.json(false);
    } else{
        return Response.json(true);
    }
    
}

export async function POST(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("favorite");
    await collection.insertOne(qData);
    const res = await collection.find({objKey: qData.objKey}).toArray();

    await likeUpdate(qData, res);

    await client.close();
    return Response.json(false);
}

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("favorite");
    await collection.deleteMany({sKey: qData.sKey, objKey: qData.objKey});
    const res = await collection.find({objKey:qData.objKey}).toArray();

    await likeUpdate(qData, res);

    await client.close();
    return Response.json(true);
}


async function likeUpdate(qData, res){
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key:qData.objKey}, {$set: {like: String(res.length)}});
    await client.close();
}

