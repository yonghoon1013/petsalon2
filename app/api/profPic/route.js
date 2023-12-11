import { dbConnect } from "../route";

export async function GET (req) {
<<<<<<< HEAD
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("member");
    const data = await collection.find({key: qData.key}).toArray();

    return Response.json(data)
=======
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("member");
    const data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
};

export async function PUT (req) {
    const qData = await req.json();
<<<<<<< HEAD
    const collection = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set:{imgUrl: qData.imgUrl}});

=======
    const {client, collection} = await dbConnect("member");
    await collection.updateOne({key: qData.key}, {$set:{imgUrl: qData.imgUrl}});

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json("사진 업로드됨");
};