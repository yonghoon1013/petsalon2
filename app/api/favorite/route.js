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

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("favorite");
    await collection.deleteOne({objKey: qData.key});
    const dataGet = await collection.find({sKey: qData.sKey}).toArray();

    await client.close();
    return Response.json(dataGet);
}
