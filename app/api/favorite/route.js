import dbConnect from "../db";

export async function GET(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const data = await collection.find({sKey: qData.sKey}).toArray();
    await client.close();

    return Response.json(data);
}

// export async function POST(req) {
//     const qData = await req.json();
//     const {client, collection} = await dbConnect("favorite");
//     await collection.insertOne({key: qData.key, sKey: qData.sKey, objKey:qData.objKey});
//     const dataGet = await collection.find().toArray();

//     await client.close();
//     return Response.json(dataGet);
// }

// export async function DELETE(req) {
//     const qData = await Object.fromEntries(req.nextUrl.searchParams);
//     const {client, collection} = await dbConnect("favorite");
//     await collection.deleteOne({sKey: qData.sKey, objKey: qData.objKey});
//     const dataGet = await collection.find({sKey: qData.sKey}).toArray();

//     await likeUpdate(qData, dataGet);

//     await client.close();
//     return Response.json(dataGet);
// }
export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("favorite");
    await collection.deleteOne({sKey: qData.sKey, objKey: qData.objKey});
    const dataGet = await collection.find({objKey:qData.objKey}).toArray();

    await likeUpdate(qData, dataGet);

    await client.close();
    return Response.json(dataGet);
}

async function likeUpdate(qData, res){
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.objKey}, {$set: {like: String(res.length)}});
    await client.close();
}
