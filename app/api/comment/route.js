import dbConnect from "../db";


export async function GET(req) {
    const {client, collection} = await dbConnect("comment");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({objKey: qData.objKey}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
    console.log(qData);
    const {client, collection} = await dbConnect("comment");
    await collection.insertOne(qData);

    let data = await collection.find().toArray();

    await client.close();
    return Response.json(data);
}


export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    console.log(qData);
    const {client, collection} = await dbConnect("comment");
    await collection.deleteOne({key:qData.key});
    let data = await collection.find().toArray();

    await client.close();
    return Response.json(data);
}