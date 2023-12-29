<<<<<<< HEAD
import { dbConnect } from "../route";


export async function GET(req) {
    const collection = await dbConnect("member");
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
    let data = await collection.find().toArray();

=======
import dbConnect from "../db";


export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

    await client.close();
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
<<<<<<< HEAD
    const collection = await dbConnect("member");
    console.log(qData);
    await collection.insertOne({id: qData.id, password: qData.pw, nickname:qData.nick, imgUrl: "", key: qData.key});
    const dataGet = await collection.find().toArray();

=======
    const {client, collection} = await dbConnect("member");
    await collection.insertOne({id: qData.id, password: qData.pw, nickname:qData.nick, key: qData.key, info: "", imgUrl: "", lng: "", lat: "", dAddress: "", dDesc: "", dNumber1: "", dNumber2: "", dNumber3: "", dPrice: "", dTime1: "", dTime2: "", like: "0"});
    const dataGet = await collection.find().toArray();

    await client.close();
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    return Response.json(dataGet);
}

export async function DELETE(req) {
<<<<<<< HEAD
    let qData = await Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    console.log(qData);
    await collection.deleteOne({id: qData.id});
    const dataGet = await collection.find().toArray();

    return Response.json(dataGet);
}

export async function PUT(req, res) {
    const qData = await req.json();
    const collection = await dbConnect("member");
    console.log(qData);
    await collection.updateOne({id: qData.id, password: qData.password}, {$set: {id: qData.mId}});
    const dataGet = await collection.find().toArray();

=======
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
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    return Response.json(dataGet);
}