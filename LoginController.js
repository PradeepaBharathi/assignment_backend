import { client } from "./db.js";

export function getUser(){
    return client
    .db("User")
    .collection("users")
    .find().toArray()
}

export function registerUser(data){
    return client
    .db("User")
    .collection("users")
    .insertOne(data)
}

export  function getUserByEmail(email) {
    const query = { email: email };
    console.log("Query:", query);
    return client.db("User").collection("users").findOne(query);
   
  }

  export function profile(data){
    return client
    .db("User")
    .collection("profile")
    .insertOne(data)
}