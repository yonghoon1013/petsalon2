import dbConnect from "../db";

export async function GET(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const { client, collection } = await dbConnect("dPics");
    const data = await collection.find({sKey: qData.sKey}).toArray();
    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
    const { client, collection } = await dbConnect("dPics");
    await collection.insertOne({key: qData.item.key, sKey: qData.item.sKey, imgUrl: qData.imgUrl});
    const dataGet = await collection.find({sKey: qData.item.sKey}).toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const { client, collection } = await dbConnect("dPics");
    await collection.deleteOne({key: qData.key});
    const dataGet = await collection.find({sKey: qData.sKey}).toArray();

    await client.close();
    return Response.json(dataGet);
}

