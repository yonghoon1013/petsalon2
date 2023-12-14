import dbConnect from "../db";

export async function GET(req, res) {
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
    const {client, collection} = await dbConnect("member");
    let data = await collection.find().toArray();

    await client.close();
    return Response.json(data);
}
