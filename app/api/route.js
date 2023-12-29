export const dbConnect = async (str) => {
    const { MongoClient } = require('mongodb');
    const client = await MongoClient.connect('mongodb+srv://lim132445:zCnCDyeTGM7toUhV@sovidi.v53i9gi.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db("petsalon");
    const collection = db.collection(str);
    console.log("mongodb 접속성공");
    return collection;
};