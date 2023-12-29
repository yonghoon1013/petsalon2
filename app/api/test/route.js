import { all } from "axios";
import dbConnect from "../db";
import dbConnect2 from "../testDb";

export async function GET(req) {
    const {client, collection} = await dbConnect("member");
    const qData = Object.fromEntries(req.nextUrl.searchParams);
    let data = await collection.find({key: qData.key}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const qData = await req.json();
    const {client, collection} = await dbConnect("member");
    const {client2, collection2} = await dbConnect2("test");

    const res = await collection.find({key: qData.key}).toArray();
    console.log(res);
    await collection2.insertOne({id: res[0].id});
    const dataGet = await collection2.find().toArray();

    await client.close();
    await client2.close();
    return Response.json(dataGet);
}

