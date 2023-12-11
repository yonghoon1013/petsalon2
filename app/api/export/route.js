import { dbConnect } from "../route";

export async function GET(req, res) {
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
    const collection = await dbConnect("member");
    let data = await collection.find().toArray();

    return Response.json(data);
}
