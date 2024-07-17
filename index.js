import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './db.js'
import { user_router } from './LoginRoute.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT

app.get("/",(req,res)=>{
    return res.status(200).send({message:"API WORKING"})
})
app.use("/user",user_router)

app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`)
})