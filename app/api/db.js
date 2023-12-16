import { MongoClient } from "mongodb";

export default async (str) => {
    const client = new MongoClient("mongodb+srv://lim132445:zCnCDyeTGM7toUhV@sovidi.v53i9gi.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    const db = client.db("petsalon");
    const collection = db.collection(str);
    console.log("MongoDB 접속성공");

    return {client, collection};
};
