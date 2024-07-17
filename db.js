import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
export async function dbConnection(){
    const client =  new MongoClient(process.env.MONGO_URL)
    await client.connect()
    console.log("DB CONNNECTED")
    return client
}

export const client = await dbConnection()