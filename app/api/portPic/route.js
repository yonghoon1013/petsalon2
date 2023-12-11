import { dbConnect } from "../route";

export async function GET(req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("dPics");
    const data = await collection.find({sKey: qData.sKey}).toArray();

    return Response.json(data);
}


export async function POST(req) {
    const qData = await req.json();
    const collection = await dbConnect("dPics");
    await collection.insertOne({key: qData.item.key, sKey: qData.item.sKey, imgUrl: qData.imgUrl});
    const dataGet = await collection.find({sKey: qData.item.sKey}).toArray();
    console.log(dataGet);

    return Response.json(dataGet);
}
