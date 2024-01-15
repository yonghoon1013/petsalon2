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
    console.log('dksljfa', qData);
    const {client, collection} = await dbConnect("member");
    await collection.insertOne({id: qData.id, password: qData.pw, nickname:qData.nick, key: String(qData.key), info: "", imgUrl: "", lng: "", lat: "", dAddress: "", dDesc: "", dNumber1: "", dNumber2: "", dNumber3: "", dPrice: "", dTime1: "", dTime2: "", like: "0", working: false, mode: qData.mode});
    console.log(qData);
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json('');
}

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    await collection.deleteOne({key: qData.key});
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function PUT(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({id: qData.id, password: qData.password}, {$set: {id: qData.mId}});
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json(dataGet);
}