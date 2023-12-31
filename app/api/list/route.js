import dbConnect from "../db";


export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({working: true}).toArray();

    console.log(req.url, req.method);
    await client.close();
    return Response.json(data);
}

export async function PUT(req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key:qData.key}, {$set: {lat: qData.lat, lng:qData.lng}});
    const data = await collection.find().toArray();

    await client.close();
    return Response.json(data);
}