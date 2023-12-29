<<<<<<< HEAD
import { dbConnect } from "../route";

export async function GET(req, res) {
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
    const collection = await dbConnect("member");
    let data = await collection.find().toArray();

=======
import dbConnect from "../db";

export async function GET(req, res) {
    // let data = await collection.find({id: "hmmm", password: "12345"}).toArray();
    const {client, collection} = await dbConnect("member");
    let data = await collection.find().toArray();

    await client.close();
>>>>>>> f123662a273fcee40a316f74c997a38828cba56c
    return Response.json(data);
}
