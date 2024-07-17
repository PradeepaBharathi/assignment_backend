import express from 'express'
import bcrypt from "bcryptjs";
import { getUserByEmail, profile, registerUser } from './LoginController.js';


const router  = express.Router()
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the details" });
      }
      const validUser = await getUserByEmail(email);
      if (!validUser) {
        return res.status(400).json({ message: "User not found" });
      }
      if (validUser) {
        const isMatch = await bcrypt.compare(password, validUser.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "invalid username or password" });
        } else {
        
          res.status(200).json({
            data: validUser,
            success: true,
            message: "login successful",
          
          });
        }
      }
    } catch (error) {
  
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.post("/signup",async(req,res)=>{
      try {
          const {name,email,password,confirmpassword} = req.body
          if(!name ||!email || !password || !confirmpassword){
              return res.status(400).json({ message: "Please fill all the details" });
          }

          if(confirmpassword !== password){
            return res.status(401).json({ message: "Password doesn't match" });

          }
          const existingUser = await getUserByEmail(email)
          if(existingUser) {
              return res.status(400).json({message:"user already exists"})
          }
         if(!existingUser){
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password,salt)
  
          const result = await registerUser({name,email,password:hashedPassword})
          if (!result.acknowledged) {
              return res.status(500).send({message:"Error Occured"})
          }
          res.status(200).json({data:{name,email,hashedPassword},status:result,message:"user registered successfully"})
  
         }    } catch (error) {
          console.log(error)
          res
            .status(500)
            .json({ message: "server error occured", success: false, error });
      }
  })

  router.post("/profile",async(req,res)=>{
    try {
        const {age,gender,dob,phone} = req.body
        if(!age ||!gender || !dob || !phone){
            return res.status(400).json({ message: "Please fill all the details" });
        }

        const result = await profile({age,gender,dob,phone})
        if (!result.acknowledged) {
            return res.status(500).send({message:"Error Occured"})
        }
        res.status(200).json({data:{age,gender,dob,phone},status:result,message:"profile added successfully"})
    } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ message: "server error occured", success: false, error });
    }
  })
  export const user_router = router;