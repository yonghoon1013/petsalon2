import dbConnect from "../db";

export async function DELETE(req) {
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    const {client, collection} = await dbConnect("dPics");
    await collection.deleteMany();
    const dataGet = await collection.find().toArray();

    await client.close();
    return Response.json(dataGet);
}
