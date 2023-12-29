import { MongoClient } from "mongodb";

export default async (str) => {
    const client2 = new MongoClient("mongodb+srv://lim132445:zCnCDyeTGM7toUhV@sovidi.v53i9gi.mongodb.net/?retryWrites=true&w=majority");
    await client2.connect();
    const db = client2.db("toGrocery");
    const collection2 = db.collection(str);
    console.log("MongoDB2 접속성공");

    return {client2, collection2};
};
