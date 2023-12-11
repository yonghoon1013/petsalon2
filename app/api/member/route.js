import { dbConnect } from "../route";


export async function GET(req) {
<<<<<<< HEAD
    const collection = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

=======
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
<<<<<<< HEAD
    const collection = await dbConnect("member");
    await collection.insertOne({id: qData.id, password: qData.pw, nickname:qData.nick, key: qData.key});
    const dataGet = await collection.find().toArray();

=======
    const {client, collection} = await dbConnect("member");
    await collection.insertOne({id: qData.id, password: qData.pw, nickname:qData.nick, key: qData.key});
    const dataGet = await collection.find().toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(dataGet);
}

export async function DELETE(req) {
<<<<<<< HEAD
    let qData = await Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    await collection.deleteOne({id: qData.id});
    const dataGet = await collection.find().toArray();

=======
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    await collection.deleteOne({id: qData.id});
    const dataGet = await collection.find().toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(dataGet);
}

export async function PUT(req) {
    const qData = await req.json();
<<<<<<< HEAD
    const collection = await dbConnect("member");
    await collection.updateOne({id: qData.id, password: qData.password}, {$set: {id: qData.mId}});
    const dataGet = await collection.find().toArray();

=======
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({id: qData.id, password: qData.password}, {$set: {id: qData.mId}});
    const dataGet = await collection.find().toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(dataGet);
}