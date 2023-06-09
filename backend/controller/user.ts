import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();

const getAllUsers=async(req:Request,res:Response)=>{
    try{
        const users=await prisma.user.findMany();
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

const addUser=async(req:Request,res:Response)=>{
    try {
        await prisma.user.create({
            data:{
                email:req.body.email
            }
        })
        res.json("created")
    } catch (error) {
        console.log("from adding user")
        res.json(error)
    }
}

const checkUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userByEmail = await prisma.user.findMany({
        where: {
          email: req.params.email,
        },
      });
      res.json(userByEmail)
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };

  
export default {
    getAllUsers,
    addUser,
    checkUser
}