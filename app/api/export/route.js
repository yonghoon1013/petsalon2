import { dbConnect } from "../route";

export async function GET(req, res) {
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
<<<<<<< HEAD
    const collection = await dbConnect("member");
    let data = await collection.find().toArray();

=======
    const {client, collection} = await dbConnect("member");
    let data = await collection.find().toArray();

    await client.close();
>>>>>>> fbf4860c19841fe5e20c7a3fe6707fef283b1526
    return Response.json(data);
}
