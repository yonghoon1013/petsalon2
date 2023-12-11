import { dbConnect } from "../route";

export async function GET(req) {
<<<<<<< HEAD
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    const collection = await dbConnect("dPics");
    const data = await collection.find({sKey: qData.sKey}).toArray();

=======
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const { client, collection } = await dbConnect("dPics");
    const data = await collection.find({sKey: qData.sKey}).toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(data);
}


export async function POST(req) {
    const qData = await req.json();
<<<<<<< HEAD
    const collection = await dbConnect("dPics");
    await collection.insertOne({key: qData.item.key, sKey: qData.item.sKey, imgUrl: qData.imgUrl});
    const dataGet = await collection.find({sKey: qData.item.sKey}).toArray();
    console.log(dataGet);

    return Response.json(dataGet);
}
=======
    const { client, collection } = await dbConnect("dPics");
    await collection.insertOne({key: qData.item.key, sKey: qData.item.sKey, imgUrl: qData.imgUrl});
    const dataGet = await collection.find({sKey: qData.item.sKey}).toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    console.log(qData);
    const { client, collection } = await dbConnect("dPics");
    await collection.deleteOne({key: qData.key});
    const dataGet = await collection.find({sKey: qData.sKey}).toArray();

    await client.close();
    return Response.json(dataGet);
}

>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
