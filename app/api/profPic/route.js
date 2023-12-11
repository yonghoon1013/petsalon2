import { dbConnect } from "../route";

export async function GET (req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    const data = await collection.find({key: qData.key}).toArray();

    return Response.json(data)
};

export async function PUT (req) {
    const qData = await req.json();
    const collection = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set:{imgUrl: qData.imgUrl}});

    return Response.json("사진 업로드됨");
};